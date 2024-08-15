package com.example.demo.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@Table(name = "carts")
public class Carts {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column
	    private int cart_id;
	    
	    @JsonIgnoreProperties("carts")
	   // @JsonManagedReference
		@ManyToOne
		@JoinColumn(name="user_id")
		 Users users;
	    
	     @ManyToOne
	     @JsonIgnoreProperties("carts")
	   //  @JsonManagedReference
	     @JoinColumn(name="p_id")
	     Product products;
	    
	    @Column
	    private int Stock_Qty;
}
