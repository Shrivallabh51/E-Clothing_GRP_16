package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Status;
import com.example.demo.repositories.StatusRepository;

@Service
public class StatusService {
	@Autowired
	private StatusRepository statusRepository;
	
	public List<Status> getAllStatuses() {
        return statusRepository.findAll();
    }
}
