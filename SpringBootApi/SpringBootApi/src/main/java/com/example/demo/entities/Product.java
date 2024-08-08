package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Table
public class Product {
   @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int p_id;
   
  @Column
  String product_Name;
  
  @Basic
  @Lob
  @Column(name = "image", nullable = true, columnDefinition = "LONGBLOB")
  byte[] image;
  

  @Column
  String description;
  @Column
  int price;

  @Column
  int stock_Qty;
  
	@JsonIgnoreProperties("products")
	@ManyToOne
	@JoinColumn(name="cat_id")
	Category category;
  
	@JsonIgnoreProperties("products")
	@ManyToOne
	@JoinColumn(name="User_Id")
	Users users;
}

