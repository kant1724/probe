package com.probe.deal;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DLComnDao {
	  List<HashMap<String,Object>> fnGetLocCdnmList(HashMap<String,Object> map);
	  List<HashMap<String,Object>> getPartnerForDealKey(String pDealKey);
	  List<HashMap<String,Object>> dlGetResult(HashMap<String,Object> map);
	  void insDealAndGetKey(HashMap<String,String> map);
	  void dlInsDL001(HashMap<String,String> map);
	  void dlInsDL002(List<HashMap<String, String>> map);
	  void dlInsDL003(List<HashMap<String, String>> map);
	  void dlInsDL004(List<HashMap<String, String>> map);
	  void dlGenerate(HashMap<String,String> map);
}
