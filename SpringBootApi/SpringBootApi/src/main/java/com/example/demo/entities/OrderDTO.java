package com.example.demo.entities;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class OrderDTO {
    private int orderId;
    private Date date;
    private float totalAmount;
    private String status;
    private int userId;  // Reference to the User_Id from the Users entity
}
