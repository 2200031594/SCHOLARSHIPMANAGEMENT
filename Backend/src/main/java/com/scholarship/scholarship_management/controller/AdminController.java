package com.scholarship.scholarship_management.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.scholarship.scholarship_management.model.User;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;
    
    @Value("${admin.id}")
    private String adminId;

    // Admin login endpoint
    @PostMapping("/admin/login")  // Add this annotation to map the POST request
    public ResponseEntity<?> adminLogin(@RequestBody User user) {
        if (adminEmail.equals(user.getEmail()) && adminPassword.equals(user.getPassword())) {
            // Return the admin ID dynamically from properties
            return ResponseEntity.ok(Map.of("id", adminId, "message", "Admin login successful"));
        } else {
            return ResponseEntity.status(401).body("Invalid admin credentials");
        }
    }
}
