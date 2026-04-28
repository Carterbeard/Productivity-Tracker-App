package com.example.python_api.controller;

import com.example.python_api.classes.GraphData;
import com.example.python_api.classes.graphingVar;
import com.example.python_api.service.pythonService;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/api/images")
public class python_controller {

    @Autowired
    private pythonService pythonService;
    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/grapher")
    public void grapher(@RequestBody graphingVar graph_variables) throws IOException, InterruptedException {
            String string_date = graph_variables.getDate();
            LocalDate date = LocalDate.parse(string_date);
            List<String> dates = new ArrayList<>();
            dates.add(string_date);
            for (int i = 1; i < 7; i++) {
                LocalDate next_date = date.minusDays(1);
                String next_date_string = next_date.toString();
                dates.add(next_date_string);
                date = next_date;
            }
            String DaysURL = "http://localhost:8080/retrieve/graph/Data";
            GraphData[] data = restTemplate.postForObject(DaysURL,dates, GraphData[].class);
            List<GraphData> graph_data = Arrays.asList(data);
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(graph_data);
            Files.writeString(Path.of("C:\\Uni\\Programming 2\\Productivity-Tracker-App\\python_api\\src\\main\\java\\com\\example\\python_api\\scripts\\temp_data.json"), json);
            pythonService.python_runner(graph_variables.getVars(),"temp_data.json");
    }

   /* @GetMapping("/Python-test")
    public String runPython() throws IOException, InterruptedException {
        return pythonService.python_runner(null, null);
    }
         */


}