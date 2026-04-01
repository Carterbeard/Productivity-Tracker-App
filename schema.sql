CREATE DATABASE productivity_tracker;
USE productivity_tracker;

CREATE TABLE days(
    date DATE PRIMARY KEY,
    steps INT,
    sleep FLOAT,
    avg_mood FLOAT,
    hours_studied FLOAT
);

CREATE TABLE goals(
    goal_id INT AUTO_INCREMENT PRIMARY KEY,
    goal_type VARCHAR(50),
    target INT,
    date_set DATE,
    deadline DATE,
    FOREIGN KEY (date_set) REFERENCES days(date)
);

CREATE TABLE mood(
    date DATE NOT NULL,
    time TIME NOT NULL,
    emoji VARCHAR(10),
    mood_int INT,
    PRIMARY KEY (date, time),
    FOREIGN KEY (date) REFERENCES days(date)
);

CREATE TABLE todo(
    todo_id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(100),
    date_set DATE,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (date_set) REFERENCES days(date)
);