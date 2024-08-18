package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PaymentDTO {
    private int paymentId;
    private String total;
    private String paymentMethodName;
    private String paymentStatus;
    private int transactionId;
    private int userId; // Mapping user ID
    private int orderId; // Mapping order ID
}