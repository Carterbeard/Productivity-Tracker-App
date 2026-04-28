package com.example.python_api.controller;

import com.example.python_api.classes.GraphData;
import com.example.python_api.classes.graphingVar;
import com.example.python_api.service.pythonService;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper; 

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@RestController
public class PythonController {

    @Autowired
    private pythonService pythonService;
    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/grapher")
    public void grapher(@RequestBody graphingVar graph_variables) {
        try {
            // 1. Log immediately to the standard console (NOT a file yet)
            System.out.println("Grapher triggered for date: " + graph_variables.getDate());

            String string_date = graph_variables.getDate();
            LocalDate date = LocalDate.parse(string_date);
            List<String> dates = new ArrayList<>();
            dates.add(string_date);
            
            for (int i = 1; i < 7; i++) {
                date = date.minusDays(1);
                dates.add(date.toString());
            }

            String DaysURL = "http://localhost:8080/retrieve/graph/Data";
            
            System.out.println("Asking 8080 for these dates: " + dates);
            GraphData[] data = restTemplate.postForObject(DaysURL, dates, GraphData[].class);

            if (data != null) {
                System.out.println("Successfully received " + data.length + " items.");
                
                List<GraphData> graph_data = Arrays.asList(data);
                ObjectMapper mapper = new ObjectMapper();
                String json = mapper.writeValueAsString(graph_data);
                
                Files.writeString(Path.of("/Users/carterbeard/Desktop/Year 1 CS/CourseWork/Group Java/ProductivityTrackerApp/backend/API/python_api/src/main/java/com/example/python_api/scripts/temp_data.json"), json);
                pythonService.python_runner(graph_variables.getVars(), "temp_data.json");
            }

        } catch (Exception e) {
            System.err.println("--- CRASH LOG ---");
            e.printStackTrace(); 
        }
    }

    /* @GetMapping("/Python-test")
    public String runPython() throws IOException, InterruptedException {
        return pythonService.python_runner(null, null);
    }
         */


}