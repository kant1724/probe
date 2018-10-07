package com.probe.partner;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PartnerMainController {
	@RequestMapping("/partnerMain")
	public String index(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		return "partner/partnerMain";
	}
	
}
