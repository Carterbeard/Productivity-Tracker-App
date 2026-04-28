package com.productivity_tracker.productivity_tracker_api.model;

public class graphingVar {

    private String date ;
    private String vars;

    public graphingVar(String date, String variables){
        this.date = date;
        this.vars = variables;
    }

    public String getDate() {
        return this.date;
    }
    public String getVars() {
        return this.vars;
    }
}
