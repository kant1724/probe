package com.probe.comn;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.probe.user.UserMainService;

@Controller
public class CMComnController {

	@Autowired
	CMComnService cmComnService;

	@Autowired
	UserMainService userMainService;
	
	@RequestMapping("/cmIndex")
	public String indexEx(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", "SpringBlog from Millky");
		return "cm/cmIndex";
	}

	@RequestMapping("/cmMain")
	public String main(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", "SpringBlog from Millky");
		return "cm/cmMain";
	}
	
	@RequestMapping("/cmNav")
	public String loadNav(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", "SpringBlog from Millky");
		return "cm/cmNav";
	}
	@RequestMapping("/cmWelcome")
	public String cmWelcome(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", "SpringBlog from Millky");
		return "cm/cmWelcome";
	}

	@RequestMapping("/cmLocInputer")
	public String cmLocInputer(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", "SpringBlog from Millky");
		return "cm/cmLocInputer";
	}

	@RequestMapping("/cmFnGetLocCdnmList")
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

			retList = cmComnService.fnGetLocCdnmList(map);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return retList; 
	}

	@RequestMapping("/cmFooter")
	//public String cmFooter(@RequestBody String body, Model model) {
	public String cmFooter(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", "SpringBlog from Millky");
		return "cm/cmFooter";
	}
}
