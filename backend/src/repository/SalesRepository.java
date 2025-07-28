package com.example.erp.repository;

import com.example.erp.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface SalesRepository extends JpaRepository<Sales, Long> {
    List<Sales> findByDate(LocalDate date);
    List<Sales> findByDateBetween(LocalDate start, LocalDate end); // 월간
}