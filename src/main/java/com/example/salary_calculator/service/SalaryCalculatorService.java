package com.example.salary_calculator.service;

import com.example.salary_calculator.dto.SalaryRequest;
import com.example.salary_calculator.dto.SalaryResponse;
import com.example.salary_calculator.model.PfType;
import com.example.salary_calculator.model.TaxRegime;
import org.springframework.stereotype.Service;
import com.example.salary_calculator.dto.CompareRequest;
import com.example.salary_calculator.dto.CompareResponse;
import com.example.salary_calculator.dto.SalaryRequest;
import com.example.salary_calculator.dto.SalaryResponse;
import com.example.salary_calculator.model.TaxRegime;


import java.util.Map;

@Service
public class SalaryCalculatorService {

    // MVP: yearly Professional Tax max by state (simple version)
    private static final Map<String, Double> PROFESSIONAL_TAX_YEARLY = Map.of(
            "WB", 2500.0,
            "MH", 2500.0,
            "KA", 2400.0,
            "TN", 2500.0,
            "DL", 0.0
    );

    private static final double STANDARD_DEDUCTION = 50000.0;

    public SalaryResponse calculate(SalaryRequest req) {

        // 1) Salary Breakup (simple MVP)
        double basicAnnual = req.getCtcAnnual() * (req.getBasicPercent() / 100.0);
        double hraAnnual = basicAnnual * (req.getHraPercentOfBasic() / 100.0);

        // Remaining amount is Special Allowance (for MVP)
        double specialAllowanceAnnual = req.getCtcAnnual() - (basicAnnual + hraAnnual);

        if (specialAllowanceAnnual < 0) specialAllowanceAnnual = 0;

        double grossAnnual = basicAnnual + hraAnnual + specialAllowanceAnnual;
        double grossMonthly = grossAnnual / 12.0;

        // 2) PF Calculation
        double employeePfAnnual = calculateEmployeePf(req.getPfType(), basicAnnual);
        double employeePfMonthly = employeePfAnnual / 12.0;

        // 3) Professional Tax
        double professionalTaxAnnual = PROFESSIONAL_TAX_YEARLY.getOrDefault(req.getState().toUpperCase(), 2500.0);

        // 4) Taxable Income (very MVP version)
        // taxable = gross - standard deduction
        double taxableIncome = Math.max(0, grossAnnual - STANDARD_DEDUCTION);

        // 5) Income tax
        double incomeTaxAnnual = calculateIncomeTax(taxableIncome, req.getTaxRegime());
        double incomeTaxMonthly = incomeTaxAnnual / 12.0;

        // 6) In-hand monthly
        double inHandMonthly = grossMonthly - employeePfMonthly - (professionalTaxAnnual / 12.0) - incomeTaxMonthly;

        return SalaryResponse.builder()
                .basicAnnual(round2(basicAnnual))
                .hraAnnual(round2(hraAnnual))
                .specialAllowanceAnnual(round2(specialAllowanceAnnual))
                .grossAnnual(round2(grossAnnual))
                .grossMonthly(round2(grossMonthly))
                .employeePfAnnual(round2(employeePfAnnual))
                .employeePfMonthly(round2(employeePfMonthly))
                .professionalTaxAnnual(round2(professionalTaxAnnual))
                .incomeTaxAnnual(round2(incomeTaxAnnual))
                .incomeTaxMonthly(round2(incomeTaxMonthly))
                .inHandMonthly(round2(inHandMonthly))
                .build();
    }

    private double calculateEmployeePf(PfType pfType, double basicAnnual) {
        if (pfType == PfType.CAPPED) {
            // PF wage cap: 15,000 per month
            double cappedBasicAnnual = 15000.0 * 12.0;
            return 0.12 * cappedBasicAnnual;
        }
        return 0.12 * basicAnnual;
    }

    /**
     * MVP slab calculations:
     * NEW regime slabs simplified version (FY 2024-25 style).
     * OLD regime slabs simplified version.
     *
     * We will upgrade to FY 2025-26 accurate slabs + rebate in next step.
     */
    private double calculateIncomeTax(double taxable, TaxRegime regime) {
        if (regime == TaxRegime.NEW) {
            return newRegimeTax(taxable);
        }
        return oldRegimeTax(taxable);
    }

    private double newRegimeTax(double income) {
        double tax = 0;

        // FY New Regime slabs (can be adjusted later if needed)
        tax += slabTax(income, 0, 300000, 0.00);
        tax += slabTax(income, 300000, 600000, 0.05);
        tax += slabTax(income, 600000, 900000, 0.10);
        tax += slabTax(income, 900000, 1200000, 0.15);
        tax += slabTax(income, 1200000, 1500000, 0.20);
        tax += slabTax(income, 1500000, Double.MAX_VALUE, 0.30);

        // ✅ Rebate (approx rule handling for new regime)
        // If taxable income is <= 700000 then tax becomes 0
        if (income <= 700000) {
            tax = 0;
        }

        // ✅ Health & Education cess 4%
        tax = tax * 1.04;

        return tax;
    }

    private double oldRegimeTax(double income) {
        double tax = 0;

        tax += slabTax(income, 0, 250000, 0.00);
        tax += slabTax(income, 250000, 500000, 0.05);
        tax += slabTax(income, 500000, 1000000, 0.20);
        tax += slabTax(income, 1000000, Double.MAX_VALUE, 0.30);

        // ✅ Rebate if income <= 500000 (old regime)
        if (income <= 500000) {
            tax = 0;
        }

        // ✅ Cess
        tax = tax * 1.04;

        return tax;
    }


    private double slabTax(double income, double lower, double upper, double rate) {
        if (income <= lower) return 0;
        double taxablePart = Math.min(income, upper) - lower;
        return taxablePart * rate;
    }

    private double round2(double val) {
        return Math.round(val * 100.0) / 100.0;
    }

    public CompareResponse compare(CompareRequest req) {

        // build SalaryRequest for NEW
        SalaryRequest newReq = new SalaryRequest();
        newReq.setCtcAnnual(req.getCtcAnnual());
        newReq.setBasicPercent(req.getBasicPercent());
        newReq.setHraPercentOfBasic(req.getHraPercentOfBasic());
        newReq.setIsMetro(req.getIsMetro());
        newReq.setState(req.getState());
        newReq.setPfType(req.getPfType());
        newReq.setTaxRegime(TaxRegime.NEW);

        // build SalaryRequest for OLD
        SalaryRequest oldReq = new SalaryRequest();
        oldReq.setCtcAnnual(req.getCtcAnnual());
        oldReq.setBasicPercent(req.getBasicPercent());
        oldReq.setHraPercentOfBasic(req.getHraPercentOfBasic());
        oldReq.setIsMetro(req.getIsMetro());
        oldReq.setState(req.getState());
        oldReq.setPfType(req.getPfType());
        oldReq.setTaxRegime(TaxRegime.OLD);

        SalaryResponse newRes = calculate(newReq);
        SalaryResponse oldRes = calculate(oldReq);

        // Decide best regime
        boolean newBetter = newRes.getInHandMonthly() >= oldRes.getInHandMonthly();
        String best = newBetter ? "NEW" : "OLD";
        double diff = Math.abs(newRes.getInHandMonthly() - oldRes.getInHandMonthly());

        return CompareResponse.builder()
                .newRegime(newRes)
                .oldRegime(oldRes)
                .bestRegime(best)
                .monthlyDifference(round2(diff))
                .build();
    }

}
