package br.ime.uris.ser;

import java.util.List;

import br.ime.uris.util.dto.InformeDto;

public interface UrlAnalyserSer {
	
	List<InformeDto> getInform(List<String> sites);
	List<InformeDto> getInformFromProject( Integer projectId);

}
