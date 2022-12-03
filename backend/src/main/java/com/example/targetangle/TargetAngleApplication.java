package com.example.targetangle;

import com.example.targetangle.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.TimeZone;


@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class TargetAngleApplication {
	public static void main(String[] args) {
		SpringApplication.run(TargetAngleApplication.class, args);
	}

	@PostConstruct
	public void init(){
		// Setting Spring Boot SetTimeZone
		TimeZone.setDefault(TimeZone.getTimeZone("Europe/Samara"));
	}
}
