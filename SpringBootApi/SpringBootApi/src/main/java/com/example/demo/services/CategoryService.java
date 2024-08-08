package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Category;
import com.example.demo.repositories.CategoryRepository;

@Service
public class CategoryService {
	@Autowired
    CategoryRepository crepo;
    
	
	public Category getCatById(int catid) {
		return crepo.findById(catid).get();
	}
	
	public Category saveC(Category cat) {
		return crepo.save(cat);
	}
    
	public List<Category> getAllCategory() {
		return crepo.findAll();
	}
}
