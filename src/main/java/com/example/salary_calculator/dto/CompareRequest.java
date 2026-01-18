package com.example.salary_calculator.dto;

import com.example.salary_calculator.model.PfType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CompareRequest {

    @NotNull
    @Min(100000)
    private Double ctcAnnual;

    @NotNull
    @Min(20)
    @Max(60)
    private Double basicPercent;

    @NotNull
    @Min(10)
    @Max(60)
    private Double hraPercentOfBasic;

    @NotNull
    private Boolean isMetro;

    @NotBlank
    private String state;

    @NotNull
    private PfType pfType;
}
