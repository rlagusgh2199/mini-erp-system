package com.example.erp.exception;

public class SalesNotFoundException extends RuntimeException {
    public SalesNotFoundException(Long id) {
        super("Sales record not found with id: " + id);
    }
}
