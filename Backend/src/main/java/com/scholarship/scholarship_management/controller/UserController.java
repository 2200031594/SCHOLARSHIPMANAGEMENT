package com.scholarship.scholarship_management.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.scholarship.scholarship_management.model.User;
import com.scholarship.scholarship_management.repository.UserRepository;
import com.scholarship.scholarship_management.service.UserService;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    // Test endpoint to check if the application is working fine
    @GetMapping("/test")
    public String test() {
        return "Working fine";
    }

    // Endpoint to handle user signup
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        try {
            if (userRepository.existsByEmail(user.getEmail())) {
                return ResponseEntity.badRequest().body("Email already exists");
            }
            userRepository.save(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error during signup: " + e.getLocalizedMessage());
        }
    }
    
    // Login endpoint
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody User user) {
//        try {
//            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
//            if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
//                return ResponseEntity.ok("Login successful");
//            } else {
//                return ResponseEntity.badRequest().body("Invalid email or password");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error during login: " + e.getLocalizedMessage());
//        }
//    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
            if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
                // Return the user details as JSON (e.g., ID, email, name)
                User loggedInUser = existingUser.get();
                return ResponseEntity.ok(loggedInUser);
            } else {
                return ResponseEntity.badRequest().body("Invalid email or password");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error during login: " + e.getLocalizedMessage());
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // Perform logout logic if needed (e.g., invalidate session/token)
        return ResponseEntity.ok("Logout successful");
    }

    // Additional endpoints for handling other user-related operations can be added here, if needed.
    
 // Get user details by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Update user details
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.getUserById(id);
        if (user != null) {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            return userService.updateUser(user);
        }
        return null; // Return error message in a real application
    }
}
