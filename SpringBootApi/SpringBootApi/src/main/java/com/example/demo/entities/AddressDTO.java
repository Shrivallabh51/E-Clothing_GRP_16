package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddressDTO {

    private int addressId;
    private String fullName;
    private String street;
    private String city;
    private String state;
    private int pincode;
    private String mobileNumber;
    private int userId; // Assuming you want to include the userId from the Users entity
}