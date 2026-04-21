package com.productivity_tracker.productivity_tracker_api.model;

import jakarta.persistence.*;

@Entity
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int todo_id;
    private String task;
    private boolean completed;
    @ManyToOne
    @JoinColumn(name = "date")
    private Days dateSet;

    public ToDo(int todo_id, String task, Days dateSet) {
        this.todo_id = todo_id;
        this.task = task;
        this.dateSet = dateSet;
        this.completed = false;
    }

    public String getTask() { return task; }
    public boolean isCompleted() { return completed; }
    public String getDateSet() { return this.dateSet.getDate(); }

    public void setTask(String task) {
        if(task == null || task.isEmpty()) throw new IllegalArgumentException("Task can't be empty");
        this.task = task;
    }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public void setDateSet(Days dateSet) { this.dateSet = dateSet; }
}