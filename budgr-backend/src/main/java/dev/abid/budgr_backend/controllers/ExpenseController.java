package dev.abid.budgr_backend.controllers;

import dev.abid.budgr_backend.models.Expense;
import dev.abid.budgr_backend.models.User;
import dev.abid.budgr_backend.repositories.ExpenseRepository;
import dev.abid.budgr_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD operations for expenses of authenticated user.
 */
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepo;

    @Autowired
    private UserRepository userRepo;

    /**
     * Helper to fetch current User entity from security context.
     */
    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByUsername(username).orElseThrow();
    }

    /**
     * Get all expenses for current user.
     */
    @GetMapping
    public List<Expense> getAll() {
        return expenseRepo.findByUser(getCurrentUser());
    }

    /**
     * Add a new expense.
     */
    @PostMapping
    public Expense addExpense(@RequestBody Expense exp) {
        exp.setId(null);
        exp.setUser(getCurrentUser());
        return expenseRepo.save(exp);
    }

    /**
     * Update an existing expense (must belong to user).
     */
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense exp) {
        Expense existing = expenseRepo.findById(id).orElseThrow();
        if (!existing.getUser().equals(getCurrentUser())) {
            throw new RuntimeException("Unauthorized");
        }
        existing.setAmount(exp.getAmount());
        existing.setCategory(exp.getCategory());
        existing.setDescription(exp.getDescription());
        existing.setDate(exp.getDate());
        return expenseRepo.save(existing);
    }

    /**
     * Delete an expense by ID.
     */
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        Expense existing = expenseRepo.findById(id).orElseThrow();
        if (!existing.getUser().equals(getCurrentUser())) {
            throw new RuntimeException("Unauthorized");
        }
        expenseRepo.delete(existing);
    }
}