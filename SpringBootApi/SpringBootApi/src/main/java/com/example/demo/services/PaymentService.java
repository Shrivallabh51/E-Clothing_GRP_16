package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Payment;
import com.example.demo.entities.PaymentDTO;
import com.example.demo.repositories.PaymentRepository;

@Service
public class PaymentService {

	@Autowired
	private PaymentRepository pRepo;;
	
	// Method to return a list of PaymentDTO
    public List<PaymentDTO> getAllPaymentsAsDto() {
        // Fetch all payments and convert them to PaymentDTO
        return pRepo.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    // Helper method to convert Payment entity to PaymentDTO
    private PaymentDTO convertToDto(Payment payment) {
    	PaymentDTO dto = new PaymentDTO();
        dto.setPaymentId(payment.getPayment_id());
        dto.setTotal(payment.getTotal());
        dto.setPaymentMethodName(payment.getPayment_method_name());
        dto.setPaymentStatus(payment.getPayment_status());
        dto.setTransactionId(payment.getTtransaction_id());
        dto.setUserId(payment.getUsers().getUser_Id());
        dto.setOrderId(payment.getOrders().getOrder_Id());
        return dto;
    }
}
