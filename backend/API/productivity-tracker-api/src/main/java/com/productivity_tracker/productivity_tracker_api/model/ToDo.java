package com.productivity_tracker.productivity_tracker_api.model;

import jakarta.persistence.*;

@Entity
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int todoId;
    private String task;
    private boolean completed;
    private String dateSet;

    public ToDo() {}

    public ToDo(int todoId, String task, String dateSet) {
        this.todoId = todoId;
        this.task = task;
        this.dateSet = dateSet;
        this.completed = false;
    }

    public String getTask() { return task; }
    public boolean isCompleted() { return completed; }
    public String getDateSet() { return dateSet; }
    public int getTodoId() { return todoId; }



    public void setTodoId(int todoId) { this.todoId = todoId; }
    public void setTask(String task) {
        if(task == null || task.isEmpty()) throw new IllegalArgumentException("Task can't be empty");
        this.task = task;
    }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public void setDateSet(String dateSet) { this.dateSet = dateSet; }
}