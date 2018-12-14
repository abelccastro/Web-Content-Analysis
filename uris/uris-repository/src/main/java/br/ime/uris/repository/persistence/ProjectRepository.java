package br.ime.uris.repository.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ime.uris.domain.persistence.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer>{

}
