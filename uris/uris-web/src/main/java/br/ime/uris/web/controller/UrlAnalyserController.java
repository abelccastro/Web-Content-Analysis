package br.ime.uris.web.controller;

import java.io.IOException;
import java.util.List;

import org.jsoup.Connection.Method;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import br.ime.uris.ser.ProjectSer;
import br.ime.uris.ser.UrlAnalyserSer;
import br.ime.uris.util.dto.AnalysisDto;
import br.ime.uris.util.dto.InformeDto;
import br.ime.uris.util.dto.ProjectDto;
import br.ime.uris.util.dto.Request;


@RestController
@RequestMapping("/")
public class UrlAnalyserController {
	
	@Autowired
	private UrlAnalyserSer urlAnalyserSer;
	
	@Autowired
	private ProjectSer projectSer;
	
    
    @RequestMapping(value = "/analysis", produces=MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<Object> analysis(@RequestBody Request request)
    {
    	List<String> sites=request.getSites();    	 
    	List<InformeDto> linformeDto= this.urlAnalyserSer.getInform(sites);
    	this.sendInform(linformeDto, request.getCallback());
        return new ResponseEntity<>(linformeDto, HttpStatus.ACCEPTED);
    }
    
    @RequestMapping(value = "/index", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> index()
    {
    	return new ResponseEntity<>("Benvindo Ao Sistema URLitis!!!", HttpStatus.ACCEPTED);
        
    }
    
    @RequestMapping(value = "/registerProject", produces=MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<Object> registerProject(@RequestBody Request request)
    {
    	ProjectDto projectDto = new ProjectDto();
    	projectDto.setSites(request.getSites());
    	
    	projectDto = this.projectSer.create(projectDto);
        return new ResponseEntity<>(projectDto, HttpStatus.ACCEPTED);
        
    }
    
    @RequestMapping(value = "/processProject", produces=MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<Object> processProject(@RequestBody Request request)
    {
    	if(request.getProjectId()== null){
    		ProjectDto projectDto = new ProjectDto();
        	projectDto.setSites(request.getSites());
        	request.setProjectId(this.projectSer.create(projectDto).getId());
    	}
    	
    	List<InformeDto> linformeDto= this.urlAnalyserSer.getInformFromProject(request.getProjectId());
    	this.sendInform(linformeDto, request.getCallback());
        return new ResponseEntity<>(linformeDto, HttpStatus.ACCEPTED);
    }
    
    @RequestMapping(value = "/analysisStatus", produces=MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<Object> analysisStatus(@RequestBody Request request)
    {
    	List<AnalysisDto> lanalysisDto= this.projectSer.getAnalysisStatus(request.getProjectId());
        return new ResponseEntity<>(lanalysisDto, HttpStatus.ACCEPTED);
    }
    
    private void sendInform(List<InformeDto> linformeDto , String callback){
    	try {	
			ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
			String json = ow.writeValueAsString(linformeDto);
			StringBuilder payload =new StringBuilder();
			payload.append("{\"sites\":");
			payload.append(json);
			payload.append("}");
			System.out.println(payload.toString());
			
			Jsoup.connect(callback)
			.method(Method.POST).ignoreContentType(true)
			.header("Content-Type", "application/json")
			.requestBody(payload.toString())
			.execute();
		} catch (IOException e) {
			e.printStackTrace();
		}
    }

}
