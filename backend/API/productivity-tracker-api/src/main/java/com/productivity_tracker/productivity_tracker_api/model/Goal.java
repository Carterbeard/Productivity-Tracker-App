package com.productivity_tracker.productivity_tracker_api.model;

import jakarta.persistence.*;

@Entity
@Table (name = "goal")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int goal_id;
    private String goalType;
    private int target;
    @ManyToOne
    @JoinColumn(name = "date")
    private Days dateSet;
    private String deadline;

    public Goal () {}

    public Goal(int goal_id,String goalType, int target, Days dateSet, String deadline) {
        this.goal_id = goal_id;
        this.goalType = goalType;
        this.target = target;
        this.dateSet = dateSet;
        this.deadline = deadline;
    }

    public String getGoalType() { return goalType; }
    public int getTarget() { return target; }
    public String getDateSet() { return this.dateSet.getDate(); }
    public String getDeadline() { return deadline; }

    public void setGoalType(String goalType) {
        if(goalType == null || goalType.isEmpty()) throw new IllegalArgumentException("Goal type can't be empty");
        this.goalType = goalType;
    }
    public void setTarget(int target) {
        if(target < 0) throw new IllegalArgumentException("Target can't be negative");
        this.target = target;
    }
    public void setDateSet(Days dateSet) { this.dateSet = dateSet; }
    public void setDeadline(String deadline) { this.deadline = deadline; }
}