package dev.abid.budgr_backend.controllers;

import dev.abid.budgr_backend.models.Income;
import dev.abid.budgr_backend.models.User;
import dev.abid.budgr_backend.repositories.IncomeRepository;
import dev.abid.budgr_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD for user incomes.
 */
@RestController
@RequestMapping("/api/incomes")
public class IncomeController {

    @Autowired
    private IncomeRepository incomeRepo;

    @Autowired
    private UserRepository userRepo;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByUsername(username).orElseThrow();
    }

    @GetMapping
    public List<Income> getAll() {
        return incomeRepo.findByUser(getCurrentUser());
    }

    @PostMapping
    public Income addIncome(@RequestBody Income inc) {
        inc.setId(null);
        inc.setUser(getCurrentUser());
        return incomeRepo.save(inc);
    }

    @PutMapping("/{id}")
    public Income updateIncome(@PathVariable Long id, @RequestBody Income inc) {
        Income existing = incomeRepo.findById(id).orElseThrow();
        if (!existing.getUser().equals(getCurrentUser())) {
            throw new RuntimeException("Unauthorized");
        }
        existing.setAmount(inc.getAmount());
        existing.setCategory(inc.getCategory());
        existing.setDescription(inc.getDescription());
        existing.setDate(inc.getDate());
        return incomeRepo.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteIncome(@PathVariable Long id) {
        Income existing = incomeRepo.findById(id).orElseThrow();
        if (!existing.getUser().equals(getCurrentUser())) {
            throw new RuntimeException("Unauthorized");
        }
        incomeRepo.delete(existing);
    }
}
