package br.ime.uris.web.controller;

import java.io.IOException;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import br.ime.uris.dao.SiteDao;
import br.ime.uris.domain.persistence.Politica;
import br.ime.uris.repository.persistence.PoliticaRepository;
import br.ime.uris.domain.persistence.Informe;
import br.ime.uris.util.dto.An_image;
import br.ime.uris.util.dto.Request;
import br.ime.uris.util.dto.SiteDto;
import br.ime.uris.util.dto.Url;

@RestController
@RequestMapping("/")
public class DemoController {
	
	@Autowired
	private SiteDao siteDao;
 
	@Autowired
	private PoliticaRepository __politicas; 
	
    
    @RequestMapping(value = "/in", produces=MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<Object> sayHello2(@RequestBody Request request)
    {
    	List<String> _sites=request.getSites();    	
    	List<Politica> _politica = __politicas.getPolitica();
    	
    	List<Informe> _informe= new ArrayList<>();
    	
    	Informe __informe;
    	for (int i = 0; i < _sites.size(); i++) 
    	{
    		__informe= new Informe();    		
    		System.out.println("***************************************************");
    		System.out.println(i+" - "+_sites.get(i));
    		Url _url=new Url(_sites.get(i));    
    		Integer status=_url.Connection();
    		if (status!=404)
    		{
    			System.out.println("Con >>>>> "+_url.Connection());
    			
    			String texto=_url.get_text().toLowerCase();
				
				if (texto=="!")
					texto=_url.get_html().toLowerCase();
				
				System.out.println(">>> "+texto);
				Boolean existe=false;
				if (texto!="!")
				{
				 
					for (int j = 0; j < _politica.size(); j++) 
			    	{
								    	
						
						if (texto.matches(_politica.get(j).getDescription()))
						{    				
							__informe.set(_sites.get(i), true,_politica.get(j).getMsg());
							System.out.println(">>> "+_url.get_url()+_politica.get(j).getMsg());
				        	existe=true;
						}
						
					}
				}
				if (existe==true)
				{						
					_informe.add(__informe);
				}
				else
				{
					__informe.set2(_sites.get(i), false);
					_informe.add(__informe);
				}
    		}
    		else 
    		{
    			__informe.set(_sites.get(i), false,"Paginas no existen!!! error 404!!!");
    			_informe.add(__informe);
    		}
    	}
    
        	
		
    	try {
			
			ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
			String json = ow.writeValueAsString(_informe);
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
        return new ResponseEntity<>(_informe, HttpStatus.ACCEPTED);
        
    }
    
    
    
    
    @RequestMapping(value = "/index", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> sayHello3()
    {
    	return new ResponseEntity<>("Benvindo Ao Sistema URLitis!!!", HttpStatus.ACCEPTED);
        
    }
}
