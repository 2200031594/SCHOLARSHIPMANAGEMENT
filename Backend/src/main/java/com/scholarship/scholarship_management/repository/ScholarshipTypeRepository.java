package com.scholarship.scholarship_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scholarship.scholarship_management.model.ScholarshipType;

@Repository
public interface ScholarshipTypeRepository extends JpaRepository<ScholarshipType, Long> {
}
