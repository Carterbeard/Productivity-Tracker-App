package com.example.python_api.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.lang.ProcessBuilder;


@Service
public class pythonService {

    public void python_runner(String values, String data) throws IOException,InterruptedException {
        ProcessBuilder Runner = new ProcessBuilder("python","Python_Grapher.py",values, data);
        Runner.directory(new File("/Users/carterbeard/Desktop/Year 1 CS/CourseWork/Group Java/ProductivityTrackerApp/backend/API/python_api/src/main/java/com/example/python_api/scripts"));
        Runner.redirectErrorStream(true);
        Process run = Runner.start();
        String output = new String (run.getInputStream().readAllBytes());
        run.waitFor();
        if (output.isEmpty()) {
            System.out.println("Python output is empty");
        } else {
            System.out.println("Python output:\n" + output);
        }
    }
}
