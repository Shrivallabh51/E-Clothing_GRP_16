package com.example.demo.entities;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Order_id", nullable = false)
    private int order_Id;

    @Temporal(TemporalType.DATE)
    @Column(name = "Date", nullable = true)
    private Date date;

    @Column(name = "Total_Amount", nullable = false)
    private float total_Amount;

    @Column(name = "Status", nullable = false, length = 100)
    private String status;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "User_id", referencedColumnName = "User_Id", nullable = true)
    @JsonIgnoreProperties("orders")
    private Users users;
    
    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("orders")
    private List<OrderDetails> orderDetails;
    
    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("orders")
    private List<Payment> payments;
    
}
