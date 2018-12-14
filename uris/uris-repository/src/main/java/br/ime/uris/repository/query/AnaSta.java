package br.ime.uris.repository.query;

public class AnaSta {
	
	private String url;
	
	private Boolean restricted;
		
	private String statusDescription;
	
	private String style;
	
	private Boolean validated;
	
	public AnaSta(String url, Boolean restricted, String statusDescription, String style, Boolean validated) {
		this.url = url;
		this.restricted = restricted;
		this.statusDescription = statusDescription;
		this.style = style;
		this.validated = validated;
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
	
}
