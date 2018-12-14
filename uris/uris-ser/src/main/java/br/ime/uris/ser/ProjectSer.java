package br.ime.uris.ser;

import java.util.List;

import br.ime.uris.util.dto.AnalysisDto;
import br.ime.uris.util.dto.ProjectDto;

public interface ProjectSer {
	
	ProjectDto create(ProjectDto project);
	
	List<AnalysisDto> getAnalysisStatus(Integer projectId);

}
