package com.scholarship.scholarship_management.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/api/**").allowedOrigins("http://localhost:3000");
//    }
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allowing CORS for all endpoints
                .allowedOrigins("http://localhost:3000") // Replace with your frontend's URL
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow the methods
                .allowCredentials(true); // Allow credentials like cookies, authorization headers, etc.
    }
}
