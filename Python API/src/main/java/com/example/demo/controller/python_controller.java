package com.example.demo.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;


@RestController
@RequestMapping("/api/images")
public class python_controller {

    private python_service Pythonservice;

    public python_controller(python_service Pythonservice){
        this.Pythonservice = Pythonservice;
    }

    @GetMapping("/retrieve/graph")
    public ResponseEntity<byte[]> get_graph() {

        // URL of the python service
        String pythonURL;

        byte[] imageBytes = imageService.downloadImageFromExternalService(pythonURL);

        return ResponseEntity.ok()contentType.(MediaType.IMAGE_PNG).body(imageBytes);
    }

}
