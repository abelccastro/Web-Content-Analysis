package br.ime.uris.domain.persistence;
import java.util.List;

public class Informe {
	public String url;
	public Boolean restrict;
	public String reason;
	//public List<String> reasons;
	
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Boolean getRestrict() {
		return restrict;
	}
	public void setRestrict(Boolean restrict) {
		this.restrict = restrict;
	}
	
	public void set(String url,Boolean restrict, String reason)
	{
		this.url=url;
		this.restrict = restrict;
		this.reason=reason;
	}
		
		

}
