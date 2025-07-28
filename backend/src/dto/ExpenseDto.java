package com.example.erp.dto;

import java.time.LocalDate;

public class ExpenseDto {
    private String category;
    private int amount;
    private String memo;
    private LocalDate date;

    // getter/setter
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }
    public String getMemo() { return memo; }
    public void setMemo(String memo) { this.memo = memo; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}