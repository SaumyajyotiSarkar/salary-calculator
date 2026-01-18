package com.example.salary_calculator.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SalaryResponse {

    private double basicAnnual;
    private double hraAnnual;
    private double specialAllowanceAnnual;

    private double grossAnnual;
    private double grossMonthly;

    private double employeePfAnnual;
    private double employeePfMonthly;

    private double professionalTaxAnnual;
    private double incomeTaxAnnual;
    private double incomeTaxMonthly;

    private double inHandMonthly;
}

