package com.scholarship.scholarship_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scholarship.scholarship_management.model.ScholarshipType;
import com.scholarship.scholarship_management.repository.ScholarshipTypeRepository;

@Service
public class ScholarshipTypeService {

    @Autowired
    private ScholarshipTypeRepository scholarshipTypeRepository;

    public void addScholarshipType(ScholarshipType type) {
        scholarshipTypeRepository.save(type);
    }
}
