package com.productivity_tracker.productivity_tracker_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "days")
public class Days {
    @Id
    private String date;
    private int steps;
    private double sleep;
    private double hoursStudied;
    private double avgMood;

    public Days() {}
//SCreen time is different
    public Days(String date, int steps, double sleep, double hoursStudied) {
        this.date = date;
        this.steps = steps;
        this.sleep = sleep;
        this.hoursStudied = hoursStudied;
        this.avgMood = 0.0;
    }

    public String getDate() { return date; }
    public int getSteps() { return steps; }
    public double getSleep() { return sleep; }
    public double getHoursStudied() { return hoursStudied; }
    public double getAvgMood() { return avgMood; }

    public void setDate(String date) { this.date = date; }
    public void setSteps(int steps) {
        if(steps < 0) throw new IllegalArgumentException("Steps can't be negative");
        this.steps = steps;
    }
    public void setSleep(double sleep) {
        if(sleep < 0) throw new IllegalArgumentException("Sleep can't be negative");
        this.sleep = sleep;
    }
    public void setHoursStudied(double hoursStudied) {
        if(hoursStudied < 0) throw new IllegalArgumentException("Hours studied can't be negative");
        this.hoursStudied = hoursStudied;
    }
    public void setAvgMood(double avgMood) { this.avgMood = avgMood; }
}