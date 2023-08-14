package com.ssafy.B306.domain.template;

import com.ssafy.B306.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long>{
    @Query("SELECT t FROM Template t WHERE t.templateDeleteDate IS NULL AND t.templateId = ?1")
    Optional<Template> findByTemplateId(Long templateId);

    @Query("SELECT t FROM Template t WHERE t.templateDeleteDate IS NULL AND t.templateId = ?1 AND t.templateUserId = ?2")
    Optional<Template> findByTemplateIdAndTemplateUserId(Long templateId, User templateUserId);
}
