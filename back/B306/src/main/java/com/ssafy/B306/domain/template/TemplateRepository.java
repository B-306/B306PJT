package com.ssafy.B306.domain.template;

import com.ssafy.B306.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long>{
    Optional<Template> findByTemplateId(Long templateId);

    Optional<Template> findByTemplateIdAndTemplateUserId(Long templateId, User templateUserId);
}
