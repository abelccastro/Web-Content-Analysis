package br.ime.uris.domain.persistence;
import java.util.ArrayList;
import java.util.List;

public class Informe {
	public String url;
	public Boolean restrict;
	public List<String> reasons;
	//public List<String> reasons;
	
	public Informe()
	{
		reasons=new ArrayList<>();
	}
	
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
		this.addReason(reason);
	}
	public void addReason(String reason)
	{
		this.reasons.add(reason);
		
	}
		
		

}