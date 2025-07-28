// src/main/java/com/example/erp/service/SalesService.java
package com.example.erp.service;

import com.example.erp.dto.SalesDto;
import com.example.erp.entity.Sales;
import com.example.erp.exception.SalesNotFoundException;
import com.example.erp.repository.SalesRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SalesService {

    private final SalesRepository salesRepository;

    public SalesService(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }

    public List<Sales> getAllSales() {
        return salesRepository.findAll();
    }

    public Sales updateSale(Long id, SalesDto dto) {
        Sales sales = salesRepository.findById(id)
                .orElseThrow(() -> new SalesNotFoundException(id));

        sales.setItem(dto.getItem());
        sales.setAmount(dto.getAmount());
        sales.setPrice(dto.getPrice());
        sales.setTotal(dto.getTotal());
        sales.setDate(dto.getDate()); // 날짜 업데이트

        return salesRepository.save(sales);
    }

    public void deleteSale(Long id) {
        if (!salesRepository.existsById(id)) {
            throw new SalesNotFoundException(id);
        }
        salesRepository.deleteById(id);
    }

    public Sales createSale(Sales sale) {
        return salesRepository.save(sale);
    }

    public List<Sales> getSalesByDate(String date) {
        LocalDate localDate = LocalDate.parse(date);
        return salesRepository.findByDate(localDate);
    }

}
