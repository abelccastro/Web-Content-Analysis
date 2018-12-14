package br.ime.uris.domain.persistence;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "analysis")
public class Analysis {
	
	@Id
	@SequenceGenerator(name="ANA_GENERATOR", sequenceName="public.sec_analysis", allocationSize = 1, initialValue= 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ANA_GENERATOR")
	@Column(name = "ana_id", unique = true, nullable = false)
	private Integer id;
	
	@Column(name="sta_id")
	private Integer statusId;
	
	@Column(name="restricted")
	private Boolean restricted;
	
	@Column(name="validated")
	private Boolean validated;
	
	@Column(name="pro_id")
	private Integer projectId;
	
	@Column(name="url")
	private String url;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getStatusId() {
		return statusId;
	}

	public void setStatusId(Integer statusId) {
		this.statusId = statusId;
	}

	public Boolean getRestricted() {
		return restricted;
	}

	public void setRestricted(Boolean restricted) {
		this.restricted = restricted;
	}

	public Boolean getvalidated() {
		return validated;
	}

	public void setvalidated(Boolean validated) {
		this.validated = validated;
	}

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer idProject) {
		this.projectId = idProject;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
}
