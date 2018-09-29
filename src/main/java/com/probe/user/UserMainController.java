package com.probe.user;

import java.util.List;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserMainController {
	@Autowired
	UserMainService userMainService;
	
	@RequestMapping("/userMain")
	public String userMain(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", "SpringBlog from Millky");
		return "/user/userMain";
	}
	
	@RequestMapping("/userMain/searchAddressBySiDoNm")
	@ResponseBody
	public List<UserMainVo> searchAddressBySiDoNm(@RequestBody String body, Model model) {
		JSONParser parser = new JSONParser();
		String siDoNm = "";
		try {
			Object obj = parser.parse(body);
			JSONObject jsonObj = (JSONObject)obj;
			siDoNm = (String)jsonObj.get("siDoNm");
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<UserMainVo> retList = userMainService.searchAddressBySiDoNm(siDoNm);
		
		return retList; 
	}
}
