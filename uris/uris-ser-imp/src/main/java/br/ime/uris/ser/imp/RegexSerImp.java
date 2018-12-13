package br.ime.uris.ser.imp;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.ime.uris.domain.persistence.RegexRestriction;
import br.ime.uris.repository.persistence.RegexRestrictionRepository;
import br.ime.uris.ser.RegexSer;
import br.ime.uris.util.dto.RegexDto;
@Component
public class RegexSerImp implements RegexSer{
	
	@Autowired
	private RegexRestrictionRepository regexRestrictionRepository;
	
	@Override
	public List<RegexDto> getRegex() {

		List<RegexRestriction> lregex = this.regexRestrictionRepository.getPolitica();
		
		List<RegexDto> lregexDto = new ArrayList<>();
		
		for(RegexRestriction regex: lregex){
			
			RegexDto regexDto = new RegexDto();	
			BeanUtils.copyProperties(regex, regexDto);
			lregexDto.add(regexDto);
		}
		
		return lregexDto;
	}

}
