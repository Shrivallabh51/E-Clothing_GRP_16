package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailsDTO {
    private int orderDetailsId;
    private int orderId;
    private String date;
    private int userId;
    private String status;
    private int productId;
    private int sellerId;
    private String productName;
    private String description;
    private int productPrice;
    private int stockQty;
    
    private float orderDetailsPrice;
}