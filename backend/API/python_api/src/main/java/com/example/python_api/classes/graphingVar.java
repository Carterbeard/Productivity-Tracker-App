package com.example.python_api.classes;

public class graphingVar {

    private String date ;
    private String vars;

    public graphingVar(String date, String vars){
        this.date = date;
        this.vars = vars;
    }

    public String getDate() {
        return this.date;
    }
    public String getVars() {
        return this.vars;
    }
}
