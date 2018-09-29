package com.probe.user;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMainDao {
	  List<UserMainVo> selectAddressBySiDoNm(String siDoNm);
	  List<UserMainVo> selectAllAddress();
	  void insert(UserMainVo userMain);
}
