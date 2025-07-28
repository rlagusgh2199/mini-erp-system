// src/main/java/com/example/erp/service/SummaryService.java
package com.example.erp.service;

import com.example.erp.dto.SummaryDto;
import com.example.erp.dto.SummarySectionDto;
import com.example.erp.entity.Expense;
import com.example.erp.entity.Sales;
import com.example.erp.repository.ExpenseRepository;
import com.example.erp.repository.SalesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SummaryService {

    private final SalesRepository salesRepository;
    private final ExpenseRepository expenseRepository;

    public SummaryDto getSummary(LocalDate date) {
        // 일간 데이터
        List<Sales> dailySalesList = salesRepository.findByDate(date);
        List<Expense> dailyExpenseList = expenseRepository.findByDate(date);

        int dailySales = dailySalesList.stream().mapToInt(Sales::getTotal).sum();
        int dailyExpense = dailyExpenseList.stream().mapToInt(Expense::getAmount).sum();
        int dailyNetProfit = dailySales - dailyExpense;
        double dailyMarginRate = dailySales > 0 ? Math.round((dailyNetProfit * 10000.0 / dailySales)) / 100.0 : 0.0;

        SummarySectionDto daily = new SummarySectionDto(
                dailySales, dailyExpense, dailyNetProfit, Math.round(dailyMarginRate * 10) / 10.0
        );

        // 월간 데이터
        LocalDate firstDayOfMonth = date.withDayOfMonth(1);
        LocalDate lastDayOfMonth = date.withDayOfMonth(date.lengthOfMonth());

        List<Sales> monthlySalesList = salesRepository.findByDateBetween(firstDayOfMonth, lastDayOfMonth);
        List<Expense> monthlyExpenseList = expenseRepository.findByDateBetween(firstDayOfMonth, lastDayOfMonth);

        int monthlySales = monthlySalesList.stream().mapToInt(Sales::getTotal).sum();
        int monthlyExpense = monthlyExpenseList.stream().mapToInt(Expense::getAmount).sum();
        int monthlyNetProfit = monthlySales - monthlyExpense;
        double monthlyMarginRate = monthlySales > 0 ? Math.round((monthlyNetProfit * 10000.0 / monthlySales)) / 100.0 : 0.0;

        SummarySectionDto monthly = new SummarySectionDto(
                monthlySales, monthlyExpense, monthlyNetProfit, Math.round(monthlyMarginRate * 10) / 10.0
        );

        return new SummaryDto(daily, monthly);
    }
}
