package com.scholarship.scholarship_management.controller;
import com.scholarship.scholarship_management.dto.ApplicationRequest;
import com.scholarship.scholarship_management.model.Scholarship;
import com.scholarship.scholarship_management.model.User;
import com.scholarship.scholarship_management.repository.ApplicationRepository;
import com.scholarship.scholarship_management.repository.ScholarshipRepository;
import com.scholarship.scholarship_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScholarshipRepository scholarshipRepository;
    @PostMapping("/applications")
    public ResponseEntity<?> submitApplication(@RequestBody ApplicationRequest request) {
        try {
            // Fetch the user from the database
            Optional<User> userOptional = userRepository.findById(request.getUserId());
            if (userOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("User not found");
            }
            User user = userOptional.get();

            // Fetch the scholarship from the database
            Optional<Scholarship> scholarshipOptional = scholarshipRepository.findById(request.getScholarshipId());
            if (scholarshipOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("Scholarship not found");
            }
            Scholarship scholarship = scholarshipOptional.get();

            // Check if the user already applied for this scholarship
            Optional<Application> existingApplication = applicationRepository.findByUserIdAndScholarshipId(
                    user.getId(), scholarship.getId()
            );
            if (existingApplication.isPresent()) {
                return ResponseEntity.badRequest().body("You have already applied for this scholarship.");
            }

            // Create a new application
            Application application = new Application();
            application.setUser(user); // Set the user
            application.setScholarship(scholarship); // Set the scholarship
            application.setName(request.getName());
            application.setEmail(request.getEmail());
            application.setGender(request.getGender());
            application.setCollegeName(request.getCollegeName());
            application.setContactNumber(request.getContactNumber());
            application.setDateOfBirth(request.getDateOfBirth());
            application.setAddress(request.getAddress());
            application.setCgpa(request.getCgpa());

            // Save the application
            applicationRepository.save(application);

            return ResponseEntity.ok("Application submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/applications/{applicationId}/{action}")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable("applicationId") Long applicationId,
            @PathVariable("action") String action) {
        try {
            Optional<Application> applicationOptional = applicationRepository.findById(applicationId);
            if (applicationOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("Application not found");
            }
            Application application = applicationOptional.get();

            if (!action.equals("approve") && !action.equals("reject")) {
                return ResponseEntity.badRequest().body("Invalid action");
            }

            // Update the status
            application.setStatus(action.equals("approve") ? "Accepted" : "Rejected");
            applicationRepository.save(application);

            return ResponseEntity.ok(action.substring(0, 1).toUpperCase() + action.substring(1) + "d successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // Fetch applications by scholarship ID
    @GetMapping("/applications/scholarship/{scholarshipId}")
    public ResponseEntity<?> getApplicationsByScholarship(@PathVariable("scholarshipId") Long scholarshipId) {
        try {
            List<Application> applications = applicationRepository.findByScholarshipId(scholarshipId);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    @GetMapping("/applications/user/{userId}")
    public ResponseEntity<?> getApplicationsByUser(
        @PathVariable("userId") Long userId, 
        @RequestParam(value = "status", required = false) String status) {

        try {
            List<Application> applications;
            if (status != null && !status.isEmpty()) {
                applications = applicationRepository.findByUserIdAndStatus(userId, status);
            } else {
                applications = applicationRepository.findByUserId(userId); // Get all applications if no status filter
            }
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }



}

