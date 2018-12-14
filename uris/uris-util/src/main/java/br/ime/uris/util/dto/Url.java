package br.ime.uris.util.dto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Connection.Response;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.jsoup.nodes.Element;


public class Url {
	public String url;
	
	public Url(String url_)
	{
		url=url_;
	}
	@SuppressWarnings("finally")
	public int Connection() 
	{
		Response response;
		int status=404;
		try {
			response = Jsoup.connect(url).userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36")
				.followRedirects(false).execute();
			System.out.println(response.statusCode() + " : " + response.url());
			status=response.statusCode();
		} catch (IOException e) {
			//e.printStackTrace();
			status= 404;

		} finally{
			return status;
		}
	}
	public String get_url()
	{
		return url;
	
	}
	public String get_text()
	{
		
		String rpta="!";
		try {
			Document doc;
			doc = Jsoup.connect(url).get();
			rpta=doc.body().text();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rpta;	
		
		
	}
	public String get_html()
	{
		
		String rpta="!";
		try {
			Document doc;
			doc = Jsoup.connect(url).get();
			rpta=doc.html().toString();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rpta;	
		
		
	}
	public String get_href()
	{
		Response response = null;		
		String rpta="!";
		try {
			Document doc;		
			response=Jsoup.connect(url).followRedirects(false).execute();
			
			if (200 == response.statusCode()){
				doc = Jsoup.connect(url).get();					
				Elements links = doc.select("a");
				rpta=links.text().toString();
			}			
		} 		catch (IOException e) {
			// TODO Auto-generated catch block
			rpta = response.statusMessage();			
		}
		return rpta;	
		
		
	}
	public List<String> get_img()
	{
		Response response = null;		
		List<String> rpta=new ArrayList<>();
		try {
			Document doc;		
			response=Jsoup.connect(url).followRedirects(false).execute();
			
			if (200 == response.statusCode()){
				
				doc = Jsoup.connect(url).get();					
				Elements links = doc.body().getElementsByTag("img");
				for (Element el : links) {
					String src = el.absUrl("src");
					//if (src.indexOfd(url)>=0)
					//{
					//	rpta.add(src);
					//	System.out.println(src);
					//}					
					rpta.add(src);					
				}
				
				
			}
				
		} 		catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println(response.statusMessage());			
		}
		return rpta;	
		
		
	}
	
	
	

}
