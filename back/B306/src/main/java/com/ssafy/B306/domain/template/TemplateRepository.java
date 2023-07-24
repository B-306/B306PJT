package com.ssafy.B306.domain.template;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long>{
    Optional<Template> findByTemplateId(Long templateId);


    List<Template> findAll();



}
