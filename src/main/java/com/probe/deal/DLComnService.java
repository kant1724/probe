package com.probe.deal;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DLComnService {
	@Autowired
	DLComnDao dlComnDao;
	
	public List<HashMap<String, Object>> fnGetLocCdnmList(HashMap<String,Object> map) {
		List<HashMap<String, Object>> retList = dlComnDao.fnGetLocCdnmList(map);
		return retList;
	}
}
