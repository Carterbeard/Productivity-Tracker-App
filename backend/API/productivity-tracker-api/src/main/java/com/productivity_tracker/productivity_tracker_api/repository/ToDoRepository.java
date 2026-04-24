package com.productivity_tracker.productivity_tracker_api.repository;

import com.productivity_tracker.productivity_tracker_api.model.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoRepository extends JpaRepository<ToDo,Integer> {
}