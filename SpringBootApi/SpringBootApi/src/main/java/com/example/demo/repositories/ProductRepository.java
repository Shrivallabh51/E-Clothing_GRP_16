package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Product;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
      
	@Modifying
	@Query("update Product p set p.image = :file where p.p_id = :id")
	public int uploadPhoto(int id,byte [] file);
}
