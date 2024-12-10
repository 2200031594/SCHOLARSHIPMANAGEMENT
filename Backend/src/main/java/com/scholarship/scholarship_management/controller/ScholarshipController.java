package com.scholarship.scholarship_management.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.scholarship.scholarship_management.model.Scholarship;
import com.scholarship.scholarship_management.repository.ScholarshipRepository;
import com.scholarship.scholarship_management.service.ScholarshipService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin")
public class ScholarshipController {

    @Value("${file.upload-dir}") // Directory for uploads, configurable in application.properties
    private String uploadDir;

    private final ScholarshipRepository scholarshipRepository;
    private final ScholarshipService scholarshipService;

    public ScholarshipController(ScholarshipRepository scholarshipRepository, ScholarshipService scholarshipService) {
        this.scholarshipRepository = scholarshipRepository;
        this.scholarshipService = scholarshipService;
    }

    @PostMapping("/add-scholarship")
    public ResponseEntity<?> addScholarship(
            @RequestParam("name") String name,
            @RequestParam("eligibility") String eligibility,
            @RequestParam("aboutProgram") String aboutProgram,
            @RequestParam("benefits") String benefits,
            @RequestParam("deadline") String deadline,
            @RequestParam("companyImage") MultipartFile companyImage,
            @RequestParam("type") String type  // Add type parameter
    ) {
        try {
            // Ensure the upload directory exists
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath); // Create directory if it doesn't exist
            }

            // Save the uploaded file
            String originalFileName = companyImage.getOriginalFilename();
            if (originalFileName == null || originalFileName.isEmpty()) {
                return ResponseEntity.badRequest().body("File name is invalid.");
            }

            // Generate a unique file name to avoid overwriting
            String uniqueFileName = System.currentTimeMillis() + "_" + originalFileName;
            Path filePath = uploadPath.resolve(uniqueFileName);
            companyImage.transferTo(filePath.toFile());

            // Create and save the scholarship
            Scholarship scholarship = new Scholarship();
            scholarship.setName(name);
            scholarship.setEligibility(eligibility);
            scholarship.setAboutProgram(aboutProgram);
            scholarship.setBenefits(benefits);
            scholarship.setDeadline(deadline);
            scholarship.setCompanyImage(uniqueFileName); 
            scholarship.setType(type);  // Set the type value

            scholarshipRepository.save(scholarship);

            return ResponseEntity.ok("Scholarship added successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving file: " + e.getMessage());
        }
    }
    @GetMapping("/scholarships")
    public List<Scholarship> getScholarships() {
        return scholarshipRepository.findAll();
    }
    
    @DeleteMapping("/delete-scholarship/{id}")
    public ResponseEntity<?> deleteScholarship(@PathVariable Long id) {
        scholarshipRepository.deleteById(id);
        return ResponseEntity.ok("Scholarship deleted successfully!");
    }
    
    private final String uploadDir1 = "C:/Users/crmou/eclipse-workspace/scholarship-management/uploads/";

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok().body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // Update scholarship details
    @PutMapping("/update-scholarship/{id}")
    public ResponseEntity<?> updateScholarship(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("eligibility") String eligibility,
            @RequestParam("aboutProgram") String aboutProgram,
            @RequestParam("benefits") String benefits,
            @RequestParam("deadline") String deadline,
            @RequestParam(value = "companyImage", required = false) MultipartFile companyImage
    ) {
        try {
            Scholarship existingScholarship = scholarshipRepository.findById(id).orElse(null);

            if (existingScholarship == null) {
                return ResponseEntity.status(404).body("Scholarship not found with ID: " + id);
            }

            // Update fields
            existingScholarship.setName(name);
            existingScholarship.setEligibility(eligibility);
            existingScholarship.setAboutProgram(aboutProgram);
            existingScholarship.setBenefits(benefits);
            existingScholarship.setDeadline(deadline);

            // Update company image if provided
            if (companyImage != null && !companyImage.isEmpty()) {
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                String originalFileName = companyImage.getOriginalFilename();
                String uniqueFileName = System.currentTimeMillis() + "_" + originalFileName;
                Path filePath = uploadPath.resolve(uniqueFileName);
                companyImage.transferTo(filePath.toFile());

                existingScholarship.setCompanyImage(uniqueFileName);
            }

            // Save the updated scholarship
            scholarshipRepository.save(existingScholarship);

            return ResponseEntity.ok("Scholarship updated successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error updating scholarship: " + e.getMessage());
        }
    }
}
