package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int address_id;

    @Column
    private String full_name;

    @Column
    private String street;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private int pincode;

    @Column
    private String mobile_number;

    @ManyToOne
    @JoinColumn(name = "user_Id", referencedColumnName = "User_Id")
    @JsonIgnoreProperties("addresses")
    private Users users;
}
