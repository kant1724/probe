package com.probe.partner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartnerMainService {
	@Autowired
	PartnerMainDao partnerMainDao;
	
	public void insertPartnerInfo(PartnerMainVo partnerMainVo) {
		partnerMainDao.insertPartnerInfo(partnerMainVo);
	}
}
