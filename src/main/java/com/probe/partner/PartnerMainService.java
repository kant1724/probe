package com.probe.partner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartnerMainService {
	@Autowired
	PartnerMainDao partnerMainDao;
	
	public List<PartnerMainVo> selectAllAddress() {
		List<HashMap<String, Object>> res = partnerMainDao.selectAllAddress();
		
		List<PartnerMainVo> retList = new ArrayList<PartnerMainVo>(); 
		for (int i = 0; i < res.size(); ++i) {
			PartnerMainVo retVo = new PartnerMainVo();
			retList.add(retVo);
		}
		
		return retList;
	}
}
