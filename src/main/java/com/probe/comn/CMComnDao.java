package com.probe.comn;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CMComnDao {
	  List<HashMap<String,Object>> fnGetLocCdnmList(HashMap<String,Object> map);
	  //List<UserMainVo> selectAllAddress();
	  //void insert(UserMainVo userMain);
}
