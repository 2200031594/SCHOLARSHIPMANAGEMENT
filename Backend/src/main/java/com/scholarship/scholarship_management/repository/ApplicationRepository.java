package com.scholarship.scholarship_management.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarship.scholarship_management.controller.Application;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    Optional<Application> findByUserIdAndScholarshipId(Long userId, Long scholarshipId);
    List<Application> findByScholarshipId(Long scholarshipId);
    List<Application> findByUserId(Long userId);
    List<Application> findByUserIdAndStatus(Long userId, String status);

}

