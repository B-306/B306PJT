package com.ssafy.B306.domain.template;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.PersistenceContext;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {

    Template findByTemplateId(Long templateId);

}
