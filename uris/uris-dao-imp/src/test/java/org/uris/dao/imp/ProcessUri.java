package org.uris.dao.imp;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import br.ime.uris.dao.imp.PageService;
import br.ime.uris.dao.imp.PoliticDao;
import br.ime.uris.dao.imp.ProjectDao;
import br.ime.uris.dao.imp.SiteDao;
import br.ime.uris.dao.imp.WebAnalizerDao;
import br.ime.uris.domain.persistence.Politic;
import br.ime.uris.domain.persistence.Project;
import br.ime.uris.domain.persistence.Site;
import br.ime.uris.util.dto.Image;

import java.util.List;

import org.junit.Test;
import junit.framework.TestCase;


/**
 * Unit test for simple App.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration()

public class ProcessUri  extends TestCase
{
	
	@Autowired
	PageService pageService;
	
	@Autowired
	SiteDao siteDao;
	
	@Autowired
	WebAnalizerDao webAnalizerDao;
	
	@Autowired
	ProjectDao projectDao;
	
	@Autowired
	PoliticDao politicDao;
   	
    public ProcessUri( String testName )
    {
        super( testName );
    }
    
    
    @Test
    public  void  getStatusURL(){
    	String url = "https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital";
    	assertNotNull(url);
    	Site site = siteDao.getSiteByUrl(url);
    	assertNotNull(site);
    	assertNotNull(site.getStatus());
    }
    
    @Test
    public  void saveUrl(){
    	String url = "https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital";
    	Integer projectNumber= null;
    	assertNotNull(projectNumber);
    	assertNotNull(url);
    	Site site = siteDao.saveUrl(url,projectNumber);
    	assertNotNull(site);
    }
    
    
    @Test
    public  void getPolitic(){
    	List<Politic> politics = politicDao.getPolitic();
    	assertNotNull(politics);
    }
    
    @Test
    public  void  getStatusPage(){
    	String url = "https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital";
    	Integer status = pageService.statusPage(url);
    	assertEquals("Not found", new Integer(404), status);
    }
    
    @Test
    public  void getPageBody(){
    	String url = "https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital";
    	assertNotNull(pageService.getBody(url));
    }
    
    @Test
    public  void getPageImage(){
    	String url = "https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital";
    	List<Image> images = pageService.getImage(url);
    	assertNotNull(images);
    }
    
    @Test
    public  void generateImageAnalyzer(){
    	
    	Image image = null;
    	assertNotNull(image);
    	pageService.analyseImage(image);
    }
    
    @Test
    public  void generateTextAnalyzer(){
    	String url = "https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital";
    	String textBody = pageService.getBody(url);
    	assertNotNull(textBody);
    	pageService.analyseText(textBody);
    }
    
    
    @Test
    public  void generateResultByURL(){
    	String url = "https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital";
    	assertNotNull(url);
    	Site site = siteDao.getSiteByUrl(url); 
    	assertNotNull(site);
    	assertNotNull(webAnalizerDao.analizeSite(site));
    }
    
    @Test
    public  void generateResultByProject(){
    	
    	Integer projectNumber = null;
    	assertNotNull(projectNumber);
    	Project project = projectDao.getProjectByNumber(projectNumber);
    	assertNotNull(project);
    	List<Site> sites = siteDao.getSiteByProject(project.getId());
    	assertNotNull(sites);
    	
    	for(Site site:sites){
    		webAnalizerDao.analizeSite(site);
    	}
    	
    }
}
