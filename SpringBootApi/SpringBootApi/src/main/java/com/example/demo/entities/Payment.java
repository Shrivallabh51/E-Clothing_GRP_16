package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int payment_id;

    @Column
    private String total;

    @Column
    private String payment_method_name;

    @Column
    private String payment_status;

    @Column(unique = true)
    private int Ttransaction_id;

    @ManyToOne
    @JoinColumn(name = "User_Id", referencedColumnName = "User_Id")
    @JsonIgnoreProperties("payments")
    private Users users;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "Order_id", nullable = true)
    @JsonIgnoreProperties("orderDetails")
    private Orders orders;
}