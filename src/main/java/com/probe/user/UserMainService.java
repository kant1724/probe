package com.probe.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserMainService {
	@Autowired
	UserMainDao userMainDao;
	
	public List<UserMainVo> searchAddressBySiDoNm(String siDoNm) {
		List<UserMainVo> retList = userMainDao.selectAddressBySiDoNm(siDoNm);
		
		return retList;
	}
}
