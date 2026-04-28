package com.productivity_tracker.productivity_tracker_api.repository;

import com.productivity_tracker.productivity_tracker_api.model.Days;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DaysRepository extends JpaRepository<Days, String> {
    Days findByDate(String date);
    List<Days> findByDateIn(List<String> dates);
}