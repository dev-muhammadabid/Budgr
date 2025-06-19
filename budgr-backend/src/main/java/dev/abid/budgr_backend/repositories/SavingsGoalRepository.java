package dev.abid.budgr_backend.repositories;

import dev.abid.budgr_backend.models.SavingsGoal;
import dev.abid.budgr_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SavingsGoalRepository extends JpaRepository<SavingsGoal, Long> {
    List<SavingsGoal> findByUser(User user);
}
