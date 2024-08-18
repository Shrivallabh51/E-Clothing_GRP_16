package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entities.AddressDTO;
import com.example.demo.services.AddressService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AddressController {

	@Autowired
    private AddressService addressService;

	//http://localhost:8090/getAllAddresses
    @GetMapping("/getAllAddresses")
    public List<AddressDTO> getAllAddresses() {
        return addressService.getAllAddresses();
    }
    
    //http://localhost:8090/addAddress?userId=1
    @PostMapping("/addAddress")
    public ResponseEntity<String> saveAddress(@RequestBody AddressDTO addressDTO, @RequestParam int userId) {
        try {
            addressService.saveAddress(addressDTO, userId);
            return new ResponseEntity<>("Address saved successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to save address", HttpStatus.BAD_REQUEST);
        }
    }
}
