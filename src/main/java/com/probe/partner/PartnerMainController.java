package com.probe.partner;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.probe.user.UserMainVo;

@Controller
public class PartnerMainController {
	@Autowired
	PartnerMainService partnerMainService;
	
	@RequestMapping("/partnerMain")
	public String partnerMain(Model model) {
		return "partner/partnerMain";
	}
	
	@RequestMapping(value = "/partnerStep", method = RequestMethod.GET)
	public String partnerStepOne(@RequestParam("name") String name, Model model) {
		model.addAttribute("name", name);
	
		return "partner/partnerStep";
	}
	
	@RequestMapping("/registerPartnerInfo")
	public String registerPartnerInfo(@RequestBody Map<String,Object> body) {
		String irsNo = body.get("irsNo").toString();
		System.out.println("irsNo:" + irsNo);
		
		return "partner/partnerStepTwo";
	}

}
