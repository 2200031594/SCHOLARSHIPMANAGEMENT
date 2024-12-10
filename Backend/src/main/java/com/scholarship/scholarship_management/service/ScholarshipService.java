package com.scholarship.scholarship_management.service;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scholarship.scholarship_management.model.Scholarship;
import com.scholarship.scholarship_management.repository.ScholarshipRepository;

@Service
public class ScholarshipService {

 @Autowired
 private ScholarshipRepository scholarshipRepository;

 public Scholarship addScholarship(Scholarship scholarship) {
     return scholarshipRepository.save(scholarship);
 }
 
 // Update an existing scholarship
 public Scholarship updateScholarship(Long id, Scholarship updatedScholarship) {
     Optional<Scholarship> optionalScholarship = scholarshipRepository.findById(id);

     if (optionalScholarship.isPresent()) {
         Scholarship existingScholarship = optionalScholarship.get();

         // Update fields
         existingScholarship.setName(updatedScholarship.getName());
         existingScholarship.setEligibility(updatedScholarship.getEligibility());
         existingScholarship.setAboutProgram(updatedScholarship.getAboutProgram());
         existingScholarship.setBenefits(updatedScholarship.getBenefits());
         existingScholarship.setDeadline(updatedScholarship.getDeadline());
         existingScholarship.setCompanyImage(updatedScholarship.getCompanyImage());

         return scholarshipRepository.save(existingScholarship);
     }

     // Throw an exception or handle the case where the ID does not exist
     throw new RuntimeException("Scholarship with ID " + id + " not found.");
 }
}
