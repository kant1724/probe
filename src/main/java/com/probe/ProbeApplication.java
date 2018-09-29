package com.probe;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.probe")
public class ProbeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProbeApplication.class, args);
	}
}


/*
CM comn 공통
PT part 파트너(공인중개사) 관련
US user 유저(실제 사용자) 관련
DL deal 딜 관련 (유저가 조건을 찾을때 사용하는 로직)

*/