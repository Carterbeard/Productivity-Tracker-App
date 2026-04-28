package com.productivity_tracker.productivity_tracker_api.controller;

import com.productivity_tracker.productivity_tracker_api.model.*;
import com.productivity_tracker.productivity_tracker_api.repository.DaysRepository;
import com.productivity_tracker.productivity_tracker_api.repository.MoodRepository;
import com.productivity_tracker.productivity_tracker_api.repository.GoalRepository;
import com.productivity_tracker.productivity_tracker_api.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class api_controller {

    @Autowired
    private DaysRepository daysRepository;

    @Autowired
    private MoodRepository moodRepository;

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private ToDoRepository todoRepository;

    @GetMapping("/")
    public String hello_world() {
        String str = "<html><body><font color=\"green\">" + "<h1>Productivity Tracker API</h1>" + "</font></body></html>";
        return str;
    }

    @PostMapping("/set/day")
    public void set_day(@RequestBody Days day) {
        daysRepository.save(day);
    }

    @GetMapping("/retrieve/day/{date}")
    public Days get_day(@PathVariable String date) {
        return daysRepository.findByDate(date);
    }

    @PostMapping("/set/mood")
    public void set_mood(@RequestBody Mood mood) {
        moodRepository.save(mood);
    }

    @GetMapping("/retrieve/mood/{date}")
    public List<Mood> get_mood(@PathVariable String date) {
        return moodRepository.findByDate(date);
    }

    @PostMapping("/set/goal")
    public void set_goal(@RequestBody Goal goal) {
        goalRepository.save(goal);
    }

    @GetMapping("/retrieve/goals/{dateSet}/{goalType}")
    public List<Goal> get_goals(@PathVariable String dateSet, @PathVariable String goalType) {
        return goalRepository.findByDateSetAndGoalType(dateSet,goalType);
    }

    @PostMapping("/set/todo")
    public void set_todo(@RequestBody ToDo todo) {
        todoRepository.save(todo);
    }

    @GetMapping("/retrieve/todo")
    public List<ToDo> get_todos() {
        return todoRepository.findAll();
    }

    @PostMapping("/retrieve/graph/Data")
    public List<GraphData> get_data(@RequestBody List<String> dates) {
        List<GraphData> Graph_Data= new ArrayList<>();
        List<Days> days = daysRepository.findByDateIn(dates);
        List<Mood> moods = moodRepository.findByDateIn(dates);
        for (int i = 0; i<7; i++) {
            Days next_day = days.get(i);
            Mood next_mood = moods.get(i);
            GraphData Next_data = new GraphData(next_day.getDate(), next_day.getSteps(), next_day.getSleep(), next_day.getHoursStudied(), next_day.getScreenTime(), next_mood.getEmoji());
            Graph_Data.add(Next_data);
        }
        return Graph_Data;
    }
}