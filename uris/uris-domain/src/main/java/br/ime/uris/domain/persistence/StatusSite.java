package br.ime.uris.domain.persistence;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "status_site")
public class StatusSite {
	
	@Id
	@Column(name = "sta_id", unique = true, nullable = false)
	private Integer id;
	
	@Column(name="nombre")
	private String name;
	
	@Column(name="style")
	private String style;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}
		
}
