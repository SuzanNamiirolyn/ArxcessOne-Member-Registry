package org.acme;

import java.time.LocalDate;
import java.time.LocalDateTime;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "members")
public class Member extends PanacheEntity {
    
    @Column(name = "full_name", nullable = false)
    public String fullName;
    
    @Column(name = "nationalId", unique = true, nullable = false)
    public String nationalId;
    
    public String phone;
    
    @Column(name = "join_date", nullable = false)
    public LocalDate joinDate;
    
    @Column(nullable = false)
    public String status = "ACTIVE";
    
    @Column(name = "created_at")
    public LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    public LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}