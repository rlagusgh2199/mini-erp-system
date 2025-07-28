package com.example.erp.service;

import com.example.erp.entity.Expense;
import com.example.erp.dto.ExpenseDto;
import com.example.erp.exception.ExpenseNotFoundException;
import com.example.erp.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense update(Long id, ExpenseDto dto) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException(id));

        expense.setCategory(dto.getCategory());
        expense.setAmount(dto.getAmount());
        expense.setMemo(dto.getMemo());
        expense.setDate(dto.getDate());
        return expenseRepository.save(expense);
    }

    public void delete(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new ExpenseNotFoundException(id);
        }
        expenseRepository.deleteById(id);
    }

    public List<Expense> getByDate(String date) {
        java.time.LocalDate localDate = java.time.LocalDate.parse(date);
        return expenseRepository.findByDate(localDate);
    }

}
