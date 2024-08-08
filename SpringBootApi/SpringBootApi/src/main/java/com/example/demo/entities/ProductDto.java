package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {

	   int p_id;
	   String product_Name;
	   String imageUrl;
	   CategoryDto categorydto;
	   String Description;
	   int price;
	   UserDto userdto;
	   int Stock_Qty;
}
