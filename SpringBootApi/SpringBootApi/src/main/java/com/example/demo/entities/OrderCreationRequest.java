package com.example.demo.entities;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class OrderCreationRequest {
	private int userId;
    private float totalPrice;
    private List<CartsDto> cartDtoList;
}
