package com.example.python_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class PythonApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PythonApiApplication.class, args);
	}

}
