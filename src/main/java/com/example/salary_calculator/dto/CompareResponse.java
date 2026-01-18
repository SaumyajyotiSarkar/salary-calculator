package com.example.salary_calculator.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompareResponse {

    private SalaryResponse newRegime;
    private SalaryResponse oldRegime;

    private String bestRegime; // "NEW" or "OLD"
    private double monthlyDifference; // best - other
}
