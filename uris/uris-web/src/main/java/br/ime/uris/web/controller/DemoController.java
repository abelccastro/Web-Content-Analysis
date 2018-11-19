package br.ime.uris.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.ime.uris.dao.SiteDao;
import br.ime.uris.util.dto.Request;
import br.ime.uris.util.dto.SiteDto;
import br.ime.uris.util.dto.Url;

@RestController
@RequestMapping("/")
public class DemoController {
	
	@Autowired
	private SiteDao siteDao;
 
    
    
    @RequestMapping(value = "/hello", produces=MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<Object> sayHello2(@RequestBody Request request)
    {
    	List<String> _sites=request.getSites();
		
    	for (int i = 0; i < _sites.size(); i++) 
    	{
    		
    		System.out.println("***************************************************");
    		System.out.println(i+" - "+_sites.get(i));
    		Url _url=new Url(_sites.get(i));    
    		_url.Connection();
    		String texto=_url.get_text().toLowerCase();
    		System.out.println(">>> "+texto);
    		System.out.println(">>> "+texto.matches(".(fazer)*(cigarro).*"));
    		System.out.println(">>> "+texto.matches(".*(tabaco).*"));
    		
    	}
        return new ResponseEntity<>(siteDao.listSite(), HttpStatus.ACCEPTED);
        
    }
}
