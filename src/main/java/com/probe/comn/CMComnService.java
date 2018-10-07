package com.probe.comn;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CMComnService {
	@Autowired
	CMComnDao cmComnDao;
	
	public List<HashMap<String, Object>> fnGetLocCdnmList(HashMap<String,Object> map) {
		List<HashMap<String, Object>> retList = cmComnDao.fnGetLocCdnmList(map);
		return retList;
	}
}
