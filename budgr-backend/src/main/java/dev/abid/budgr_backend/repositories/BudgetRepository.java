package dev.abid.budgr_backend.repositories;

import dev.abid.budgr_backend.models.Budget;
import dev.abid.budgr_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUser(User user);
}
