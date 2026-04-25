package com.productivity_tracker.productivity_tracker_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "mood")
public class Mood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long moodId;

    private String date;
    private String time;
    private Integer emoji;

    public Mood() {}

    public Mood(String date, String time, Integer emoji) {
        this.date = date;
        this.time = time;
        this.emoji = emoji;
    }

    public String getDate() { return date; }
    public String getTime() { return time; }
    public Integer getEmoji() { return emoji; }

    public void setDate(String date) { this.date = date; }
    public void setTime(String time) { this.time = time; }
    public void setEmoji(Integer emoji) {
        if(emoji == null) throw new IllegalArgumentException("Emoji can't be empty");
        this.emoji = emoji;
    }
}