package com.probe.part;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PTComnController {
	@RequestMapping("/ptWelcome")
	public String index(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", "SpringBlog from Millky");
		return "pt/ptWelcome";
	}
	
}
