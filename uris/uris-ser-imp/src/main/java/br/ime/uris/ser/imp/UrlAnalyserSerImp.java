package br.ime.uris.ser.imp;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.ime.uris.domain.persistence.Analysis;
import br.ime.uris.repository.persistence.AnalysisRepository;
import br.ime.uris.ser.RegexSer;
import br.ime.uris.ser.UrlAnalyserSer;
import br.ime.uris.util.constant.UtilParams;
import br.ime.uris.util.dto.InformeDto;
import br.ime.uris.util.dto.RegexDto;
import br.ime.uris.util.dto.Url;

@Component
public class UrlAnalyserSerImp implements  UrlAnalyserSer {

	@Autowired
	private RegexSer regexSer;
	
	@Autowired
	private AnalysisRepository analysisRepository;
	
	@Override
	public List<InformeDto> getInform(List<String> sites) {
		
    	List<RegexDto> lregexDto = regexSer.getRegex();
    	List<InformeDto> linformedto= new ArrayList<>();
		
		for (int i = 0; i < sites.size(); i++) 
    	{
    		System.out.println("***************************************************");
    		System.out.println(i+" - "+sites.get(i));
    		Url _url=new Url(sites.get(i));    
    		_url.Connection();
    		String texto=_url.get_text().toLowerCase();
    		
    		System.out.println(">>> "+texto);
    		for (int j = 0; j < lregexDto.size(); j++) 
        	{
    			if (texto.matches(lregexDto.get(j).getDescription()))
    			{			
    				InformeDto _linformedto= new InformeDto();    		    	
    				_linformedto.set(sites.get(i), true,lregexDto.get(j).getMsg());
    				linformedto.add(_linformedto);
    				System.out.println(">>> "+_url.get_url()+lregexDto.get(j).getMsg());
    			}
        	}
    		
    		System.out.print("+++++++++\n");
    		//System.out.print(_url.get_img().toString());
    		//List<String> imgs=_url.get_img();
    		//for (String img: imgs)
    		//{
    		//	An_image _an_img=new An_image(img);
    		//	_an_img.get_descripcion();
    		//}
    		
    		
    		//System.out.print("\n +++++++++\n");
    	}
		
		return linformedto;
	}

	@Override
	public List<InformeDto> getInformFromProject(Integer projectId) {
    	List<RegexDto> lregexDto = regexSer.getRegex();
    	List<InformeDto> linformedto= new ArrayList<>();
    	
    	List<Analysis> sites = this.analysisRepository.getByProject(projectId);
    	
		for (Analysis site:sites) 
    	{
    		Url _url=new Url(site.getUrl());    
    		_url.Connection();
    		String texto=_url.get_text().toLowerCase();
    		
    		for (int j = 0; j < lregexDto.size(); j++) 
        	{
    			if (texto.matches(lregexDto.get(j).getDescription()))
    			{			
    				InformeDto _linformedto= new InformeDto();    		    	
    				_linformedto.set(site.getUrl(), true,lregexDto.get(j).getMsg());
    				linformedto.add(_linformedto);
    				site.setRestricted(Boolean.TRUE);
    			}
        	}
    		site.setStatusId(UtilParams.STATUS_SITE_PROCESSED);
    		this.analysisRepository.saveAndFlush(site);
    	}
		
		return linformedto;
	}

}
