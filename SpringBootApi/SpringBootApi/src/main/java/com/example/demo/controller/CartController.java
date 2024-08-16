package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.CartsDto;
import com.example.demo.services.CartService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
   @Autowired
   CartService cser;
   
   @GetMapping("/getcart/{userId}")
   public ResponseEntity<List<CartsDto>> getCartsByUserId(@PathVariable int userId) {
       List<CartsDto> cartsList = cser.getCartsByUserId(userId);
       return ResponseEntity.ok(cartsList);
   }
   //http://localhost:8090/addtocart?userId=3&productId=7&quantity=2
   @PostMapping("/addtocart")
   public ResponseEntity<String> addToCart(
           @RequestParam("userId") Integer userId,
           @RequestParam("productId") Integer productId,
           @RequestParam("quantity") Integer quantity) {
       try {
           cser.addItemToCart(userId, productId, quantity);
           return ResponseEntity.ok("Item added to cart successfully!");
       } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body("Error adding item to cart: " + e.getMessage());
       }
   }
   
   @DeleteMapping("/remove")
   public ResponseEntity<String> removeFromCart(
           @RequestParam("userId") int userId,
           @RequestParam("productId") int productId) {
       try {
           cser.removeItemFromCart(userId, productId);
           return ResponseEntity.ok("Item removed from cart successfully!");
       } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body("Error removing item from cart: " + e.getMessage());
       }
   }
   
  
   @DeleteMapping("/clearCart/{userId}")
   public ResponseEntity<String> clearCart(@PathVariable int userId) {
       cser.clearCartByUserId(userId);
       return ResponseEntity.ok("Cart cleared successfully.");
   }
   
   @PostMapping("/increment")
   public ResponseEntity<String> incrementQuantity(
           @RequestParam("userId") int userId,
           @RequestParam("productId") int productId) {
       try {
           cser.updateQuantity(userId, productId, 1);
           return ResponseEntity.ok("Quantity incremented successfully!");
       } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body("Error incrementing quantity: " + e.getMessage());
       }
   }
   
   @PostMapping("/decrement")
   public ResponseEntity<String> decrementQuantity(
           @RequestParam("userId") Integer userId,
           @RequestParam("productId") Integer productId) {
       try {
           cser.updateQuantity(userId, productId, -1);
           return ResponseEntity.ok("Quantity decremented successfully!");
       } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body("Error decrementing quantity: " + e.getMessage());
       }
   }
   
   
}
