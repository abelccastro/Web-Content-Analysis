package br.ime.uris.rest.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import br.ime.uris.dao.config.DaoConfiguration;
import br.ime.uris.repository.config.RepositoryConfiguration;
import br.ime.uris.ser.config.SerConfiguration;
import br.ime.uris.web.config.WebConfiguration;

public class RestServicesInitializer  implements  WebApplicationInitializer{
	
	@Override
	public void onStartup(ServletContext context) throws ServletException {
AnnotationConfigWebApplicationContext rootCtx = new AnnotationConfigWebApplicationContext();
		
//		SecurityConfiguration.class, 
		rootCtx.register(RestServiceConfiguration.class, WebConfiguration.class, SerConfiguration.class,
				RepositoryConfiguration.class, DaoConfiguration.class);
		context.addListener(new ContextLoaderListener(rootCtx));
		
		AnnotationConfigWebApplicationContext dispatcherServlet = new AnnotationConfigWebApplicationContext();
		ServletRegistration.Dynamic servlet = context.addServlet("dispatcher",
				new DispatcherServlet(dispatcherServlet));
		
		
		servlet.setLoadOnStartup(1);
		servlet.addMapping("/");

	}


}
