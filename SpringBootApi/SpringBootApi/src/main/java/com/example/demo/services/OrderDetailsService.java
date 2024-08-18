package com.example.demo.services;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.OrderDetailsDTO;
import com.example.demo.entities.OrderDetails;
import com.example.demo.repositories.OrderDetailsRepository;

@Service
public class OrderDetailsService {
	@Autowired
    private OrderDetailsRepository orderDetailsRepository;

    public List<OrderDetailsDTO> getAllOrderDetails() {
        return orderDetailsRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    public List<OrderDetailsDTO> getOrderDetailsBySellerId(int sellerId) {
        return orderDetailsRepository.findAll().stream()
                .filter(orderDetails -> orderDetails.getProduct().getUsers().getUser_Id() == sellerId)
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    public List<OrderDetailsDTO> getOrderDetailsByUserId(int UserId) {
        return orderDetailsRepository.findAll().stream()
                .filter(orderDetails -> orderDetails.getOrders().getUsers().getUser_Id() == UserId)
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private OrderDetailsDTO mapToDTO(OrderDetails orderDetails) {
        OrderDetailsDTO dto = new OrderDetailsDTO();
        
        // Set OrderDetails attributes
        dto.setOrderDetailsId(orderDetails.getOrderDetailsId());
        dto.setStockQty(orderDetails.getStockQty());
        dto.setOrderDetailsPrice(orderDetails.getPrice());
        
        // Set Orders attributes
        dto.setOrderId(orderDetails.getOrders().getOrder_Id());
        dto.setDate(orderDetails.getOrders().getDate().toString());
        dto.setUserId(orderDetails.getOrders().getUsers().getUser_Id()); // Assuming `getUserId()` is present in `Users` entity
        dto.setStatus(orderDetails.getOrders().getStatus());
        
        
        // Set Product attributes
        dto.setProductName(orderDetails.getProduct().getProduct_Name());
        dto.setDescription(orderDetails.getProduct().getDescription());
        dto.setProductPrice(orderDetails.getProduct().getPrice());
        dto.setProductId(orderDetails.getProduct().getP_id());
        dto.setSellerId(orderDetails.getProduct().getUsers().getUser_Id());
        
        return dto;
    }
	
	
    
}
