package br.ime.uris.domain.persistence;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "regex_restriction")
public class RegexRestriction {
		
	@Id
	@Column(name = "reg_res_id", unique = true, nullable = false)
	private Integer id;
	
	@Column(name = "description")
	private String description;
	
	@Column(name="rule")
	private String msg;
	
	@Column(name="res_id")
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

	

}
