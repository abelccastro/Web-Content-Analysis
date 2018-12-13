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

import br.ime.uris.ser.UrlAnalyserSer;
import br.ime.uris.util.dto.InformeDto;
import br.ime.uris.util.dto.Request;


@RestController
@RequestMapping("/")
public class UrlAnalyserController {
	
	@Autowired
	private UrlAnalyserSer urlAnalyserSer;
	
    
    @RequestMapping(value = "/in", produces=MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<Object> sayHello2(@RequestBody Request request)
    {
    	List<String> sites=request.getSites();    	
 
    	List<InformeDto> linformeDto= this.urlAnalyserSer.getInform(sites);
    	
    	try {
			
			ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
			String json = ow.writeValueAsString(linformeDto);
			StringBuilder payload =new StringBuilder();
			payload.append("{\"sites\":");
			payload.append(json);
			payload.append("}");
			System.out.println(payload.toString());
			
			Jsoup.connect(request.getCallback())
			.method(Method.POST).ignoreContentType(true)
			.header("Content-Type", "application/json")
			.requestBody(payload.toString())
			.execute();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return new ResponseEntity<>(linformeDto, HttpStatus.ACCEPTED);
        
    }
    
    @RequestMapping(value = "/index", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> sayHello3()
    {
    	return new ResponseEntity<>("Benvindo Ao Sistema URLitis!!!", HttpStatus.ACCEPTED);
        
    }
}
