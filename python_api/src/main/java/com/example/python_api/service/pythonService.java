package com.example.python_api.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.lang.ProcessBuilder;


@Service
public class pythonService {

    public void python_runner(String values, String data) throws IOException,InterruptedException {
        ProcessBuilder Runner = new ProcessBuilder("py","Python_Grapher.py",values, data);
        Runner.directory(new File("C:\\Uni\\Programming 2\\Productivity-Tracker-App\\python_api\\src\\main\\java\\com\\example\\python_api\\scripts"));
        Runner.redirectErrorStream(true);
        Process run = Runner.start();
        String output = new String (run.getInputStream().readAllBytes());
        run.waitFor();
        if (output.isEmpty()) {
            System.out.println( "Output is empty");
        }
    }
}
