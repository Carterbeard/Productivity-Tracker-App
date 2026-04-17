package com.productivity_tracker.productivity_tracker_api.model;

import jakarta.persistence.*;

@Entity
@IdClass(Mood.class)
@Table(name = "mood")
public class Mood {
    @Id
    @ManyToOne
    @JoinColumn(name = "date")
    private Days date;
    @Id
    private String time;
    private String emoji;
    private int moodInt;

    public Mood() {}

    public Mood(Days date, String time, String emoji, int moodInt) {
        this.date = date;
        this.time = time;
        this.emoji = emoji;
        this.moodInt = moodInt;
    }

    public String getDate() { return this.date.getDate(); }
    public String getTime() { return time; }
    public String getEmoji() { return emoji; }
    public int getMoodInt() { return moodInt; }

    public void setDate(Days date) { this.date = date; }
    public void setTime(String time) { this.time = time; }
    public void setEmoji(String emoji) {
        if(emoji == null || emoji.isEmpty()) throw new IllegalArgumentException("Emoji can't be empty");
        this.emoji = emoji;
    }
    public void setMoodInt(int moodInt) {
        if(moodInt < 1 || moodInt > 5) throw new IllegalArgumentException("Mood must be between 1 and 5");
        this.moodInt = moodInt;
    }
}