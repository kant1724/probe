package com.probe.deal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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
	public String index(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", "SpringBlog from Millky");
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
		return "dl/dlMain";
	}
	
	@RequestMapping("/dlFnGetLocCdnmList")
	@ResponseBody
	public List<HashMap<String,Object>> fnGetLocCdnmList(@RequestBody String body, Model model) {
		List<HashMap<String,Object>> retList = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			HashMap<String, Object> map = mapper.readValue(body, new TypeReference<Map<String, String>>(){}); 
			
			//JSONParser parser = new JSONParser();
			//Object obj = parser.parse(body);
			//JSONObject jsonObj = (JSONObject)obj;
			//System.out.println((String)jsonObj.get("pMode"));
			//System.out.println((String)jsonObj.get("pParam"));
	
			retList = dlComnService.fnGetLocCdnmList(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
	
		return retList; 
	}

}