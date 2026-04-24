package com.productivity_tracker.productivity_tracker_api.model;

import jakarta.persistence.*;

@Entity
@Table (name = "goal")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalId;
    private String goalType;
    private double target;
    private String dateSet;

    public Goal () {}

    public Goal(String goalType, double target, String dateSet) {
        this.goalType = goalType;
        this.target = target;
        this.dateSet = dateSet;
    }

    public String getGoalType() { return goalType; }
    public double getTarget() { return target; }
    public String getDateSet() { return this.dateSet; }
    public Long getGoalId() { return goalId; }

    public void setGoalId(Long goalId) { 
        this.goalId = goalId; 
    }
    public void setGoalType(String goalType) {
        if(goalType == null || goalType.isEmpty()) throw new IllegalArgumentException("Goal type can't be empty");
        this.goalType = goalType;
    }
    public void setTarget(double target) {
        if(target < 0) throw new IllegalArgumentException("Target can't be negative");
        this.target = target;
    }
    public void setDateSet(String dateSet) { this.dateSet = dateSet; }
}