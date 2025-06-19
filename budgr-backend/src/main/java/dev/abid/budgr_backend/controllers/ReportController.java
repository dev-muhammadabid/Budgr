package dev.abid.budgr_backend.controllers;

import dev.abid.budgr_backend.models.User;
import dev.abid.budgr_backend.repositories.ExpenseRepository;
import dev.abid.budgr_backend.repositories.IncomeRepository;
import dev.abid.budgr_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Provides summary data for financial reports.
 */
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private IncomeRepository incomeRepo;

    @Autowired
    private ExpenseRepository expenseRepo;

    @Autowired
    private UserRepository userRepo;

    /**
     * GET /api/reports/summary
     * Returns total income, total expense, and net savings for the current user.
     */
    @GetMapping("/summary")
    public Map<String, Double> getSummary() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username).orElseThrow();
        double totalIncome = incomeRepo.findByUser(user).stream().mapToDouble(i -> i.getAmount()).sum();
        double totalExpense = expenseRepo.findByUser(user).stream().mapToDouble(e -> e.getAmount()).sum();
        Map<String, Double> summary = new HashMap<>();
        summary.put("totalIncome", totalIncome);
        summary.put("totalExpense", totalExpense);
        summary.put("netSavings", totalIncome - totalExpense);
        return summary;
    }
}
