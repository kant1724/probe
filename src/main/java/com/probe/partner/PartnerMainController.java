package com.probe.partner;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PartnerMainController {
	@RequestMapping("/partnerMain")
	public String partnerMain(Model model) {
		return "partner/partnerMain";
	}
	
	@RequestMapping(value = "/partnerStepOne", method = RequestMethod.GET)
	public String partnerStepOne(@RequestParam("name") String name, Map<String, Object> model) {
		model.put("name", name);
	
		return "partner/partnerStepOne";
	}
	
	@RequestMapping("/partnerStepTwo")
	public String partnerStepTwo(@RequestParam("name") String name, Model model) {
		return "partner/partnerStepTwo";
	}
}
