package br.ime.uris.ser.imp;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.ime.uris.domain.persistence.Analysis;
import br.ime.uris.domain.persistence.Project;
import br.ime.uris.repository.persistence.AnalysisRepository;
import br.ime.uris.repository.persistence.ProjectRepository;
import br.ime.uris.repository.query.AnaSta;
import br.ime.uris.ser.ProjectSer;
import br.ime.uris.util.constant.UtilParams;
import br.ime.uris.util.dto.AnalysisDto;
import br.ime.uris.util.dto.ProjectDto;

@Component
public class ProjectSerImp implements ProjectSer{
	
	@Autowired
	private ProjectRepository projectRepository; 
	
	@Autowired
	private AnalysisRepository analysisRepository; 
	
	
	@Override
	public ProjectDto create(ProjectDto projectDto) {
		
		Project project = new Project();
		project= this.projectRepository.save(project);
		
		BeanUtils.copyProperties(project, projectDto);
		
		for(String site: projectDto.getSites()){
			
			Analysis analysis = new Analysis();
			analysis.setProjectId(projectDto.getId());
			analysis.setUrl(site);
			analysis.setvalidated(true);
			analysis.setStatusId(UtilParams.STATUS_SITE_WAITING);
			
			this.analysisRepository.save(analysis);
		}
		
		return projectDto;
	}


	@Override
	public List<AnalysisDto> getAnalysisStatus(Integer projectId) {
		List<AnaSta> analysisStatus = this.analysisRepository.getWithAnalysis(projectId);
		List<AnalysisDto> lanalysisDto = new ArrayList<>(); 
		
		for(AnaSta analysis: analysisStatus){
			AnalysisDto analysisDto = new AnalysisDto();
			BeanUtils.copyProperties(analysis, analysisDto);
			lanalysisDto.add(analysisDto);
		}
		return lanalysisDto;
	}

}
