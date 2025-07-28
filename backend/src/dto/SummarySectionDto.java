package com.example.erp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SummarySectionDto {
    private int sales;
    private int expense;
    private int netProfit;
    private double marginRate;
}
