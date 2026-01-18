package com.example.salary_calculator.controller;

import com.example.salary_calculator.dto.SalaryRequest;
import com.example.salary_calculator.dto.SalaryResponse;
import com.example.salary_calculator.service.SalaryCalculatorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.salary_calculator.dto.CompareRequest;
import com.example.salary_calculator.dto.CompareResponse;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SalaryController {

    private final SalaryCalculatorService salaryCalculatorService;

    @PostMapping("/calculate")
    public SalaryResponse calculate(@Valid @RequestBody SalaryRequest request) {
        return salaryCalculatorService.calculate(request);
    }

    @PostMapping("/compare")
    public CompareResponse compare(@Valid @RequestBody CompareRequest request) {
        return salaryCalculatorService.compare(request);
    }

}
