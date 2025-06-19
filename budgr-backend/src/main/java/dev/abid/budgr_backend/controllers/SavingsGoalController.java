package dev.abid.budgr_backend.controllers;

import dev.abid.budgr_backend.models.SavingsGoal;
import dev.abid.budgr_backend.models.User;
import dev.abid.budgr_backend.repositories.SavingsGoalRepository;
import dev.abid.budgr_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD for savings goals.
 */
@RestController
@RequestMapping("/api/savings")
public class SavingsGoalController {

    @Autowired
    private SavingsGoalRepository savingsRepo;

    @Autowired
    private UserRepository userRepo;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByUsername(username).orElseThrow();
    }

    @GetMapping
    public List<SavingsGoal> getAll() {
        return savingsRepo.findByUser(getCurrentUser());
    }

    @PostMapping
    public SavingsGoal addGoal(@RequestBody SavingsGoal goal) {
        goal.setId(null);
        goal.setUser(getCurrentUser());
        return savingsRepo.save(goal);
    }

    @PutMapping("/{id}")
    public SavingsGoal updateGoal(@PathVariable Long id, @RequestBody SavingsGoal goal) {
        SavingsGoal existing = savingsRepo.findById(id).orElseThrow();
        if (!existing.getUser().equals(getCurrentUser())) {
            throw new RuntimeException("Unauthorized");
        }
        existing.setName(goal.getName());
        existing.setTargetAmount(goal.getTargetAmount());
        existing.setCurrentAmount(goal.getCurrentAmount());
        return savingsRepo.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteGoal(@PathVariable Long id) {
        SavingsGoal existing = savingsRepo.findById(id).orElseThrow();
        if (!existing.getUser().equals(getCurrentUser())) {
            throw new RuntimeException("Unauthorized");
        }
        savingsRepo.delete(existing);
    }
}
