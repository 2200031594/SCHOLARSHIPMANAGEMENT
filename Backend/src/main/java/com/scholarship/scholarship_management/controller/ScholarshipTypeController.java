package com.scholarship.scholarship_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scholarship.scholarship_management.model.ScholarshipType;
import com.scholarship.scholarship_management.repository.ScholarshipTypeRepository;
import com.scholarship.scholarship_management.service.ScholarshipTypeService;

@RestController
@RequestMapping("/api/admin")
public class ScholarshipTypeController {

    @Autowired
    private ScholarshipTypeService scholarshipTypeService;
    @Autowired
    private ScholarshipTypeRepository scholarshipTypeRepository;

    @PostMapping("/add-scholarship-type")
    public ResponseEntity<String> addScholarshipType(@RequestBody ScholarshipType type) {
        scholarshipTypeService.addScholarshipType(type);
        return ResponseEntity.ok("Scholarship type added successfully!");
    }
    @GetMapping("/scholarship-types")
    public List<ScholarshipType> getScholarshipTypes() {
        return scholarshipTypeRepository.findAll(); // Correct usage of instance
    }

}
