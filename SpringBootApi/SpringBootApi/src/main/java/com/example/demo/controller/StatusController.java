package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Status;
import com.example.demo.services.StatusService;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StatusController {
	
	@Autowired
	private StatusService statusService;
	
	//http://localhost:8090/getAllStatuses
	@GetMapping("/getAllStatuses")
    public List<Status> getAllStatuses() {
        return statusService.getAllStatuses();
    }
}
