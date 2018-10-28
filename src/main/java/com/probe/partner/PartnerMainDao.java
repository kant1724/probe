package com.probe.partner;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PartnerMainDao {
	  List<HashMap<String,Object>> fnGetLocCdnmList(HashMap<String,Object> map);
	  //List<UserMainVo> selectAllAddress();
	  //void insert(UserMainVo userMain);
}
