package br.ime.uris.repository.query;

public class AnaSta {
	
	private String url;
	
	private Boolean restricted;
		
	private String statusDescription;
	
	private String style;
	
	private Boolean validated;
	
	private Integer statusId;
	
	public AnaSta(String url, Boolean restricted, String statusDescription, String style, Boolean validated, Integer statusId) {
		this.url = url;
		this.restricted = restricted;
		this.statusDescription = statusDescription;
		this.style = style;
		this.validated = validated;
		this.statusId = statusId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Boolean getRestricted() {
		return restricted;
	}

	public void setRestricted(Boolean restricted) {
		this.restricted = restricted;
	}

	public String getStatusDescription() {
		return statusDescription;
	}

	public void setStatusDescription(String statusDescription) {
		this.statusDescription = statusDescription;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public Boolean getValidated() {
		return validated;
	}

	public void setValidated(Boolean validated) {
		this.validated = validated;
	}

	public Integer getStatusId() {
		return statusId;
	}

	public void setStatusId(Integer statusId) {
		this.statusId = statusId;
	}
	
}
