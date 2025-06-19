package dev.abid.budgr_backend.repositories;

import dev.abid.budgr_backend.models.Expense;
import dev.abid.budgr_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);
}
