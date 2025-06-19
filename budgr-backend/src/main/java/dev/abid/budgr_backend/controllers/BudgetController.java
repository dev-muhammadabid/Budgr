package dev.abid.budgr_backend.controllers;

import dev.abid.budgr_backend.models.Budget;
import dev.abid.budgr_backend.models.User;
import dev.abid.budgr_backend.repositories.BudgetRepository;
import dev.abid.budgr_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD for monthly budgets by category.
 */
@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepo;

    @Autowired
    private UserRepository userRepo;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByUsername(username).orElseThrow();
    }

    @GetMapping
    public List<Budget> getAll() {
        return budgetRepo.findByUser(getCurrentUser());
    }

    @PostMapping
    public Budget addBudget(@RequestBody Budget b) {
        b.setId(null);
        b.setUser(getCurrentUser());
        return budgetRepo.save(b);
    }

    @PutMapping("/{id}")
    public Budget updateBudget(@PathVariable Long id, @RequestBody Budget b) {
        Budget existing = budgetRepo.findById(id).orElseThrow();
        if (!existing.getUser().equals(getCurrentUser())) {
            throw new RuntimeException("Unauthorized");
        }
        existing.setCategory(b.getCategory());
        existing.setAmount(b.getAmount());
        existing.setMonth(b.getMonth());
        existing.setYear(b.getYear());
        return budgetRepo.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable Long id) {
        Budget existing = budgetRepo.findById(id).orElseThrow();
        if (!existing.getUser().equals(getCurrentUser())) {
            throw new RuntimeException("Unauthorized");
        }
        budgetRepo.delete(existing);
    }
}
