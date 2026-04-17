package com.productivity_tracker.productivity_tracker_api.repository;

import com.productivity_tracker.productivity_tracker_api.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Long> {
}