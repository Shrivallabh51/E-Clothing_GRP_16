package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.OrderDetailsDTO;
import com.example.demo.services.OrderDetailsService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class OrderDetailsController {
	
	@Autowired
    private OrderDetailsService orderDetailsService;

	//http://localhost:8090/getAllOrderDetails
    @GetMapping("/getAllOrderDetails")
    public ResponseEntity<List<OrderDetailsDTO>> getAllOrderDetails() {
        List<OrderDetailsDTO> orderDetails = orderDetailsService.getAllOrderDetails();
        return ResponseEntity.ok(orderDetails);
    }
    
    //http://localhost:8090/seller/{sellerId}
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<OrderDetailsDTO>> getOrderDetailsBySellerId(@PathVariable int sellerId) {
        List<OrderDetailsDTO> orderDetails = orderDetailsService.getOrderDetailsBySellerId(sellerId);
        return ResponseEntity.ok(orderDetails);
    }
	 
    //http://localhost:8090/user/{UserId}
    @GetMapping("/user/{UserId}")
    public ResponseEntity<List<OrderDetailsDTO>> getOrderDetailsByUserId(@PathVariable int UserId) {
        List<OrderDetailsDTO> orderDetails = orderDetailsService.getOrderDetailsByUserId(UserId);
        return ResponseEntity.ok(orderDetails);
    }
	 
}
