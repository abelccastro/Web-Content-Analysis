package br.ime.uris.repository.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ime.uris.domain.persistence.Politica;

public interface PoliticaRepository extends JpaRepository<Politica, Integer>{
	
	@Query("from Politica")
	public List<Politica> getPolitica();

}
