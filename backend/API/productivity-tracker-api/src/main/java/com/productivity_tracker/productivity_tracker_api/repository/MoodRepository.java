package com.productivity_tracker.productivity_tracker_api.repository;
import com.productivity_tracker.productivity_tracker_api.model.Mood;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MoodRepository extends JpaRepository<Mood, Mood> {
    List<Mood> findByDate(String date);
}