package com.probe.deal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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
	
	public List<HashMap<String, Object>> dlGetResult(String pDealKey) {
		HashMap<String, String> vDLGen = new HashMap<String, String>();
		vDLGen.put("DL_KEY", pDealKey);
		vDLGen.put("DL_COUNT", "");
		dlComnDao.dlGenerate(vDLGen);

		List<HashMap<String, Object>> retList = dlComnDao.getPartnerForDealKey(pDealKey);
		return retList;
	}

	public String insDealGetKey(JSONArray jArray) throws ParseException {
		HashMap<String, String> vGetDealKey = new HashMap<String, String>();
		dlComnDao.insDealAndGetKey(vGetDealKey);
		String vDealKey = vGetDealKey.get("id").toString();

		HashMap<String, String> vDL001 = new HashMap<String, String>();
		List<HashMap<String, String>> vDL002 = new ArrayList<HashMap<String,String>>();
		List<HashMap<String, String>> vDL003 = new ArrayList<HashMap<String,String>>();
		List<HashMap<String, String>> vDL004 = new ArrayList<HashMap<String,String>>();

		JSONParser parser = new JSONParser();
		
		for ( int i = 0; i < jArray.size(); i++ ) {
			JSONObject json = (JSONObject) jArray.get(i);

			if ( json.get("data") == null ) continue;
			if ( json.get("step") == null ) continue;
			
			String vStep = json.get("step").toString();
			
			JSONArray vListData = (JSONArray) parser.parse(json.get("data").toString());
			JSONObject vData = (JSONObject) parser.parse(vListData.get(0).toString());

			if ( "1".equals(vStep) ) {
				vDL001.put("DL_KEY", vDealKey);
				vDL001.put("POSITION", fnGet(vData, "code"));
				
			} else if ( "2".equals(vStep) ) {
				for ( int j = 0; j < vListData.size(); j++ ) {
					vData = (JSONObject) parser.parse(vListData.get(j).toString());
					HashMap<String, String> vDL002_h = new HashMap<String, String>();
					vDL002_h.put("DL_KEY", vDealKey);
					vDL002_h.put("DEAL_METH", fnGet(vData, "code"));
					vDL002_h.put("DEAL_AMT" , fnNvl(fnGet(vData, "amt" ), "0"));
					vDL002_h.put("DEAL_AMT2", fnNvl(fnGet(vData, "amt2"), "0"));
					vDL002.add(vDL002_h);
				}
				
			} else if ( "3".equals(vStep) ) {
				for ( int j = 0; j < vListData.size(); j++ ) {
					vData = (JSONObject) parser.parse(vListData.get(j).toString());
					HashMap<String, String> vDL003_h = new HashMap<String, String>();
					vDL003_h.put("DL_KEY", vDealKey);
					vDL003_h.put("ITEM_CD", fnGet(vData, "code"));
					vDL003.add(vDL003_h);
				}

			} else if ( "4".equals(vStep) ) {
				JSONArray vListStep4 = (JSONArray) parser.parse(fnGet(vData, "depth3"));
				for ( int j = 0; j < vListStep4.size(); j++ ) {
					JSONObject json3 = (JSONObject) parser.parse(vListStep4.get(j).toString());
					HashMap<String, String> vDL004_h = new HashMap<String, String>();
					vDL004_h.put("DL_KEY", vDealKey);
					vDL004_h.put("AREA_CODE_DONG", fnGet(json3, "code"));
					vDL004.add(vDL004_h);
				}
				
			} else if ( "5".equals(vStep) ) {
				// 2에서 처리
			} else if ( "6".equals(vStep) ) {
				vDL001.put("CONTEXT", fnGet(vData, "cdnm"));
			}
		}

		//System.out.println(vDL001);
		//System.out.println(vDL002);
		//System.out.println(vDL003);
		//System.out.println(vDL004);

		dlComnDao.dlInsDL001(vDL001);
		dlComnDao.dlInsDL002(vDL002);
		dlComnDao.dlInsDL003(vDL003);
		dlComnDao.dlInsDL004(vDL004);

		return vDealKey;
	}
	
	public String fnGet(JSONObject pData, String pKey) {
		if ( pData.get(pKey) == null ) return "";
		return pData.get(pKey).toString();
	}

	public String fnNvl(String pOrg, String pNvl) {
		if ( pOrg == null || "".equals(pOrg) ) return pNvl;
		return pOrg;
	}
	
}
