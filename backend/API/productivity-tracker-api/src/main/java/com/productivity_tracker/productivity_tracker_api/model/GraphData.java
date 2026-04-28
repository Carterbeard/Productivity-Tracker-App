package com.productivity_tracker.productivity_tracker_api.model;


public class GraphData {

    private String date;
    private int steps;
    private double sleep;
    private double hoursStudied;
    private double screenTime;
    private Integer mood;

    public GraphData(String date, Integer steps,double sleep, double hoursStudied, double screenTime, Integer mood){
        this.date = date;
        this.steps = steps;
        this.sleep = sleep;
        this.hoursStudied = hoursStudied;
        this.screenTime = screenTime;
        this.mood = mood;
    }

    public GraphData() {
    }

    public String getDate() { return date; }
    public Integer getSteps() { return steps; }
    public double getSleep() { return sleep; }
    public double getHoursStudied() { return hoursStudied; }
    public double getScreenTime() { return screenTime; }
    public Integer getMood() {return mood;}

    public void setDate(String date) { this.date = date; }
    public void setSteps(Integer steps) {
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
    public void setScreenTime(double screenTime) {
        if (screenTime < 0 ) throw new IllegalArgumentException("Screen time cannot be negative");
        this.screenTime = screenTime;
    }
}
