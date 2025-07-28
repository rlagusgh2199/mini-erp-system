package com.example.erp.repository;

import com.example.erp.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByDate(LocalDate date); // 날짜별 조회 메서드 추가
    List<Expense> findByDateBetween(LocalDate start, LocalDate end); // 월간
}