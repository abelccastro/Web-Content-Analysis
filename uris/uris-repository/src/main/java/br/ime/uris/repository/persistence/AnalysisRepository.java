package br.ime.uris.repository.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.ime.uris.domain.persistence.Analysis;
import br.ime.uris.repository.query.AnaSta;

public interface AnalysisRepository extends JpaRepository<Analysis, Integer> {
	
	@Query("from Analysis a where a.projectId = :projectId")
	List<Analysis> getByProject(@Param("projectId") Integer id);
	
	@Query("select new br.ime.uris.repository.query.AnaSta(a.url, a.restricted, s.name, s.style, a.validated) from Analysis a, StatusSite s where a.statusId = s.id AND a.projectId = :projectId")
	List<AnaSta> getWithAnalysis(@Param("projectId") Integer projectId);
}
