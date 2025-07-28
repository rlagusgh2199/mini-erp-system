package com.example.erp.dto;

import java.time.LocalDate;

public class InventoryDto {
    private String name;
    private int qty;
    private int price;
    private LocalDate date;

    // getter/setter
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getQty() { return qty; }
    public void setQty(int qty) { this.qty = qty; }
    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}
