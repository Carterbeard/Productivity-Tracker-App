package com.productivity_tracker.productivity_tracker_api.model;

import jakarta.persistence.*;

@Entity
@IdClass(Mood.class)
@Table(name = "mood")
public class Mood {
    @Id
    private String date;
    @Id
    private String time;
    private int emoji;

    public Mood() {}

    public Mood(String date, String time, int emoji) {
        this.date = date;
        this.time = time;
        this.emoji = emoji;
    }

    public String getDate() { return date; }
    public String getTime() { return time; }
    public int getEmoji() { return emoji; }

    public void setDate(String date) { this.date = date; }
    public void setTime(String time) { this.time = time; }
    public void setEmoji(int emoji) {
        this.emoji = emoji;
    }
}