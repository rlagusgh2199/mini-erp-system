package com.example.erp.dto;

import java.time.LocalDate;

public class SalesDto {
    private String item;
    private int amount;
    private int price;
    private int total;
    private LocalDate date;

    // getter/setter
    public String getItem() { return item; }
    public void setItem(String item) { this.item = item; }

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getTotal() { return total; }
    public void setTotal(int total) { this.total = total; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}
