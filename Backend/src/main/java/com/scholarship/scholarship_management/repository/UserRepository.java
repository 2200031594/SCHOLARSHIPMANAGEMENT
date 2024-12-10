// src/main/java/com/scholarshipapp/repository/UserRepository.java
package com.scholarship.scholarship_management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarship.scholarship_management.model.User; 

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}
