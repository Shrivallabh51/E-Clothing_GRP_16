package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Status;
public interface StatusRepository extends JpaRepository<Status, Integer> {

}
