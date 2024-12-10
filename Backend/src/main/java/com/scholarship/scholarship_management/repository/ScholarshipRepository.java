package com.scholarship.scholarship_management.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarship.scholarship_management.model.Scholarship;

public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
}
