package br.ime.uris.util.dto;

import java.util.List;

public class Request {
	List<String> sites;
	String callback;
	
	public List<String> getSites() {
		return sites;
	}
	public void setSites(List<String> sites) {
		this.sites = sites;
	}
	public String getCallback() {
		return callback;
	}
	public void setCallback(String callback) {
		this.callback = callback;
	}
	
}
