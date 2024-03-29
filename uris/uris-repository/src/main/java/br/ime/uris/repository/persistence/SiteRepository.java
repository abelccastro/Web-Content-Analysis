package br.ime.uris.repository.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ime.uris.domain.persistence.Site;

public interface SiteRepository extends JpaRepository<Site, Integer> {

	@Query("from Site s where s.estado = ?1")
	public List<Site> getSite(Integer estado);
}
