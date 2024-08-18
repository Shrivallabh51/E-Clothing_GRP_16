package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PlaceOrder {
    private String full_name;
    private String street;
    private String city;
    private String state;
    private int pincode;
    private String mobile_number;
    private String payment_method_name;
}