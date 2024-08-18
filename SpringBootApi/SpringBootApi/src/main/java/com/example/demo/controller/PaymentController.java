package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.PaymentDTO;
import com.example.demo.services.PaymentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
	@Autowired
    private PaymentService paymentService;

    //http://localhost:8090/getAllPayments
    @GetMapping("/getAllPayments")
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        List<PaymentDTO> paymentDtoList = paymentService.getAllPaymentsAsDto();
        return ResponseEntity.ok(paymentDtoList);
    }
}
