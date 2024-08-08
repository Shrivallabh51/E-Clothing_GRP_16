package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Category;
import com.example.demo.services.CategoryService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CategoryController {
	 @Autowired
     CategoryService cser;
	
	
	@PostMapping("/savecat")
	public Category savecat(@RequestBody  Category cat) {
		return cser.saveC(cat);
	}
	
	@GetMapping("/getcat")
	public List<Category> getCat(){
		return cser.getAllCategory();
	}	
}
