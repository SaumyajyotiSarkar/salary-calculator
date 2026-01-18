package com.example.salary_calculator.dto;

import com.example.salary_calculator.model.PfType;
import com.example.salary_calculator.model.TaxRegime;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SalaryRequest {

    @NotNull
    @Min(100000)
    private Double ctcAnnual;

    // Default you can send 40 from frontend
    @NotNull
    @Min(20)
    @Max(60)
    private Double basicPercent;

    // Metro: usually 50, Non-metro: usually 40
    @NotNull
    @Min(10)
    @Max(60)
    private Double hraPercentOfBasic;

    @NotNull
    private Boolean isMetro;

    @NotNull
    private TaxRegime taxRegime;

    // Example: "WB", "MH", "KA"
    @NotBlank
    private String state;

    @NotNull
    private PfType pfType;
}
