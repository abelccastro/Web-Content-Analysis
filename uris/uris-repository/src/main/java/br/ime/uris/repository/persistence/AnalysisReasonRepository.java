package br.ime.uris.repository.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ime.uris.domain.persistence.AnalysisReason;

public interface AnalysisReasonRepository  extends JpaRepository<AnalysisReason, Integer> {

}
