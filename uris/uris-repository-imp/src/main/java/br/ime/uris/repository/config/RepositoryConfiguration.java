package br.ime.uris.repository.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EnableTransactionManagement
@PropertySource({ "file:${app.config}/persistence.properties" })
@EnableJpaRepositories(basePackages = "br.ime.uris.repository.persistence", entityManagerFactoryRef = "movilEntityManagerFactory", transactionManagerRef = "movilTransactionManager")
@ComponentScan(value = { "br.ime.uris.repository.persistence.imp" })

public class RepositoryConfiguration {
	@Autowired
	private Environment env;
	
	
//	@Bean
//	public DataSource dataSource() {
//		HikariConfig config = new HikariConfig();
//		
//		config.setJdbcUrl(env.getProperty("uris.jdbc.url"));
//		config.setUsername(env.getProperty("uris.jdbc.user"));
//		config.setPassword(env.getProperty("uris.jdbc.password"));
//		
//		config.setMaximumPoolSize(30);
//		config.setMinimumIdle(20);
//		config.setMaxLifetime(30000);
//		config.setIdleTimeout(30000);
//		
//		config.addDataSourceProperty("cachePrepStmts", "true");
//		config.addDataSourceProperty("prepStmtCacheSize", "250");
//		config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
//		config.addDataSourceProperty("useServerPrepStmts", "true");
//		
//		return new HikariDataSource(config);
//	}
	
	@Bean
    public  DataSource dataSource() {
		 DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(env.getProperty("uris.jdbc.driver"));
        dataSource.setUsername(env.getProperty("uris.jdbc.user"));
        dataSource.setUrl(env.getProperty("uris.jdbc.url"));
        dataSource.setPassword(env.getProperty("uris.jdbc.password"));
        return dataSource;
    }


	@Bean
	public LocalContainerEntityManagerFactoryBean movilEntityManagerFactory() {
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(dataSource());
		em.setPackagesToScan(new String[] { "br.ime.uris.domain.persistence" });

		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		vendorAdapter.setShowSql(false);
		vendorAdapter.setGenerateDdl(false);// true
		em.setJpaVendorAdapter(vendorAdapter);
		em.setJpaProperties(additionalProperties());

		return em;
	}


	@Bean
	public PlatformTransactionManager movilTransactionManager() {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager
				.setEntityManagerFactory(movilEntityManagerFactory()
						.getObject());

		return transactionManager;
	}

	@Bean
	public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
		return new PersistenceExceptionTranslationPostProcessor();
	}

	Properties additionalProperties() {
		Properties properties = new Properties();
		return properties;
	}

}
