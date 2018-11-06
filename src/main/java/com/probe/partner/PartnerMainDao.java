package com.probe.partner;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PartnerMainDao {
	void insertPartnerInfo(PartnerMainVo partnerMainVo);
}
