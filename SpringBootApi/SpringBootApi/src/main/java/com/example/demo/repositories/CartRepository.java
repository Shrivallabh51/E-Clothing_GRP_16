package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Carts;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface CartRepository extends JpaRepository<Carts, Integer> {
	  @Query("SELECT c FROM Carts c WHERE c.users.User_Id = :userId")
	    List<Carts> findByUserId(@Param("userId") int userId);
	  
	  @Query("SELECT c FROM Carts c WHERE c.users.User_Id = :userId and c.products.p_id = :productId")
	  Optional<Carts> findByUserIdAndProductId(@Param("userId") int userId,@Param("productId") int productId);
}
