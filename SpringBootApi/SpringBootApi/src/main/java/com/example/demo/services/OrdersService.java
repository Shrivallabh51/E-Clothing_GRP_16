package com.example.demo.services;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.CartsDto;
import com.example.demo.entities.OrderDTO;
import com.example.demo.entities.OrderDetails;
import com.example.demo.entities.Orders;
import com.example.demo.entities.Product;
import com.example.demo.entities.Users;
import com.example.demo.repositories.OrderDetailsRepository;
import com.example.demo.repositories.OrdersRepository;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.repositories.UsersRepository;



@Service
public class OrdersService {

    @Autowired
    private OrdersRepository orepo;
    
    @Autowired
    private UsersRepository urepo;
    
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    
    @Autowired
    ProductRepository productRepository;
    
    public List<OrderDTO> getAllOrders() {
        List<Orders> ordersList = orepo.findAll();
        
        // Convert Orders entities to OrderDTOs
        return ordersList.stream()
                         .map(this::convertToDTO)
                         .collect(Collectors.toList());
    }

    // Helper method to convert Orders entity to OrderDTO
    private OrderDTO convertToDTO(Orders order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderId(order.getOrder_Id());
        orderDTO.setDate(order.getDate());
        orderDTO.setTotalAmount(order.getTotal_Amount());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setUserId(order.getUsers().getUser_Id()); // Assuming the user is not null
        return orderDTO;
    }
    
    public OrderDTO saveOrder(OrderDTO orderDto) {
        // Convert OrderDTO to Orders entity
        Orders order = new Orders();
        order.setDate(orderDto.getDate());
        order.setTotal_Amount(orderDto.getTotalAmount());
        order.setStatus(orderDto.getStatus());

        // Fetch the user by userId and set it in the Orders entity
        Users user = urepo.findById(orderDto.getUserId())  // Fetch user by userId
                          .orElseThrow(() -> new RuntimeException("User not found with ID: " + orderDto.getUserId()));
        order.setUsers(user);

        // Save the order
        Orders savedOrder = orepo.save(order);

        // Convert the saved Orders entity back to OrderDTO
        OrderDTO savedOrderDto = new OrderDTO();
        savedOrderDto.setOrderId(savedOrder.getOrder_Id());
        savedOrderDto.setUserId(savedOrder.getUsers().getUser_Id());
        savedOrderDto.setDate(savedOrder.getDate());
        savedOrderDto.setTotalAmount(savedOrder.getTotal_Amount());
        savedOrderDto.setStatus(savedOrder.getStatus());

        return savedOrderDto;
    }
    
    public String updateOrderStatus(int orderId, String status) {
        try {
            Orders order = orepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

            order.setStatus(status);
            orepo.save(order);

            return "Status updated successfully";
        } catch (RuntimeException e) {
            return "Status update failed: " + e.getMessage();
        }
    }
    
    public int createOrder(int userId, float totalPrice, List<CartsDto> cartDtoList) {
        try {
            // Create an Orders object
            Orders order = new Orders();
            order.setDate(new Date()); // Set current date
            order.setTotal_Amount(totalPrice);
            order.setStatus("Pending");

            // Fetch the user by userId and set it in the Orders entity
            Users user = urepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
            order.setUsers(user);

            // Save the Orders object to the database
            Orders savedOrder = orepo.save(order);

            // Iterate over the CartDto array and create OrderDetails objects
            for (CartsDto cartDto : cartDtoList) {
                OrderDetails orderDetails = new OrderDetails();
                orderDetails.setOrders(savedOrder);
                orderDetails.setStockQty(cartDto.getStockQty());
                orderDetails.setPrice(cartDto.getProductDto().getPrice());

             // Fetch the Product entity based on p_id from ProductDto
                Product product = productRepository.findById(cartDto.getProductDto().getP_id())
                        .orElseThrow(() -> new RuntimeException("Product not found with ID: " + cartDto.getProductDto().getP_id()));
                
                orderDetails.setProduct(product);

                // Save each OrderDetails object to the database
                orderDetailsRepository.save(orderDetails);
            }

            return savedOrder.getOrder_Id();
        } catch (RuntimeException e) {
            return -1;
        }
    }
}
