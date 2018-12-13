package br.ime.uris.util.dto;

public class RegexDto {

	private Integer id;
	
	private String description;
	
	private String msg;
	
	private Integer idRestriction ;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Integer getIdRestriction() {
		return idRestriction;
	}

	public void setIdRestriction(Integer idRestriction) {
		this.idRestriction = idRestriction;
	}
}
