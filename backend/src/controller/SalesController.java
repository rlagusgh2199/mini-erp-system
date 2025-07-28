// src/main/java/com/example/erp/controller/SalesController.java

package com.example.erp.controller;

import com.example.erp.dto.SalesDto;
import com.example.erp.entity.Sales;
import com.example.erp.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.*;
import java.time.LocalDate;

import java.util.List;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SalesController {

    private final SalesService salesService;

    // GET: 매출 목록 조회
    @GetMapping
    public List<Sales> getAllSales() {
        return salesService.getAllSales();
    }

    // POST: 새 매출 항목 추가
    @PostMapping
    public Sales createSale(@RequestBody Sales sale) {
        return salesService.createSale(sale);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sales> update(@PathVariable Long id, @RequestBody SalesDto dto) {
        Sales updated = salesService.updateSale(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        salesService.deleteSale(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Sales>> getByDate(@PathVariable String date) {
        List<Sales> list = salesService.getSalesByDate(date);
        return ResponseEntity.ok(list);
    }
}
