package br.ime.uris.domain.persistence;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "analysis_reason")
public class AnalysisReason {
	
	@Id
	@SequenceGenerator(name="ANA_REA_GENERATOR", sequenceName="public.sec_analysis_reason", allocationSize = 1, initialValue= 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ANA_REA_GENERATOR")
	@Column(name = "ana_det_id", unique = true, nullable = false)
	private Integer id;
	
	@Column(name="ana_id")
	private Integer analysisId;
	
	@Column(name="res_id")
	private Integer restrictionId;
	
	@Column(name="reason")
	private String reason;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getAnalysisId() {
		return analysisId;
	}

	public void setAnalysisId(Integer analysisId) {
		this.analysisId = analysisId;
	}

	public Integer getRestrictionId() {
		return restrictionId;
	}

	public void setRestrictionId(Integer restrictionId) {
		this.restrictionId = restrictionId;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
}
