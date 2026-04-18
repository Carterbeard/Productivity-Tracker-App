package com.productivity_tracker.productivity_tracker_api.repository;

import com.productivity_tracker.productivity_tracker_api.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByDateSetAndGoalType(String dateSet, String goalType);
}