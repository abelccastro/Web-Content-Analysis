package br.ime.uris.repository.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ime.uris.domain.persistence.RegexRestriction;

public interface RegexRestrictionRepository extends JpaRepository<RegexRestriction, Integer>{
	
	@Query("from RegexRestriction")
	public List<RegexRestriction> getPolitica();

}
