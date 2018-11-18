package com.probe.deal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class DLComnController {

	@Autowired
	DLComnService dlComnService;

	@RequestMapping("/dlStep1")
	public String index(Model model) {
		/*
		JSONParser parser = new JSONParser();
		Object obj;
		try {
			obj = parser.parse(body);
			JSONObject jsonObj = (JSONObject)obj;
			System.out.println((String)jsonObj.get("pMode"));
			System.out.println((String)jsonObj.get("pParam"));
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		*/
		return "dl/dlStep1";
	}
	
	@RequestMapping("/dlMain")
	public String dlMain(@RequestParam(name="meth", required=false, defaultValue="1") String pMeth, Model model) {
		model.addAttribute("name", "SpringBlog from Millky");

		System.out.println(pMeth);
		if ( "8".equals(pMeth) ) {
			model.addAttribute("dlValStep1", "8");
		} else if ( "9".equals(pMeth) ) {
			model.addAttribute("dlValStep1", "9");
		} else {
			model.addAttribute("dlValStep1", "");
		}
		
		return "dl/dlMain";
	}
	
	@RequestMapping("/dlFnGetLocCdnmList")
	@ResponseBody
	public List<HashMap<String,Object>> fnGetLocCdnmList(@RequestBody String body, Model model) {
		List<HashMap<String,Object>> retList = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			HashMap<String, Object> map = mapper.readValue(body, new TypeReference<Map<String, String>>(){}); 
			retList = dlComnService.fnGetLocCdnmList(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
	
		return retList; 
	}

	@RequestMapping("/dlGetResult")
	@ResponseBody
	// 딜 받아서 저장. 결과 리턴까지.
	public HashMap<String,String> dlGetResult(@RequestBody String body, Model model) {
		HashMap<String,String> retList = new HashMap<String,String>();
		try {
			ObjectMapper mapper = new ObjectMapper();
			HashMap<String, Object> map = mapper.readValue(body, new TypeReference<Map<String, String>>(){}); 

			JSONParser parser = new JSONParser();
			JSONArray jArray = (JSONArray) parser.parse(map.get("data").toString());

			String vDealKey = dlComnService.insDealGetKey(jArray);  // 딜 정보 인서트 후 딜키 리턴
			retList.put("DEAL_KEY", vDealKey);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return retList; 
	}

	@RequestMapping("/dlResult")
	public String dlResult(@RequestParam(name="dealKey", required=false, defaultValue="1") String pDealKey, Model model) {
		model.addAttribute("dealKey", pDealKey);
		System.out.println(pDealKey);
		return "dl/dlResult";
	}

	@RequestMapping("/dlResultList")
	@ResponseBody
	// 딜 받아서 저장. 결과 리턴까지.
	public List<HashMap<String,Object>> dlResultList(@RequestBody String body, Model model) {
		List<HashMap<String,Object>> retList = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			HashMap<String, Object> map = mapper.readValue(body, new TypeReference<Map<String, String>>(){}); 

			String vDealKey = map.get("dealKey").toString();
			retList = dlComnService.dlGetResult(vDealKey); // 딜 정보로 매칭정보 만들어서 리스트로 리턴
		} catch (Exception e) {
			e.printStackTrace();
		}

		return retList; 
	}

	

}