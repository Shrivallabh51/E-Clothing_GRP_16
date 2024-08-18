package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.PlaceOrder;
import com.example.demo.services.PlaceOrderService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PlaceOrderController {

    @Autowired
    private PlaceOrderService placeOrderService;

    //http://localhost:8090/placeOrder?userId=<userId>&orderId=<orderId>&totalPrice=<totalPrice>
    //http://localhost:8090/placeOrder?userId=1&orderId=1&totalPrice=150.00

    @PostMapping("/placeOrder")
    public ResponseEntity<String> placeOrder(
            @RequestParam int userId,
            @RequestParam int orderId,
            @RequestParam String totalPrice,
            @RequestBody PlaceOrder placeOrder) {

        boolean isOrderPlaced = placeOrderService.placeOrder(userId, orderId, placeOrder, totalPrice);

        if (isOrderPlaced) {
            return ResponseEntity.ok("Order placed successfully");
        } else {
            return ResponseEntity.status(500).body("Failed to place order");
        }
    }
}
