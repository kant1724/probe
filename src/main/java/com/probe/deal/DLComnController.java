package com.probe.deal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class DLComnController {
	@RequestMapping("/dlStep1")
	public String index(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", "SpringBlog from Millky");
		return "dl/dlStep1";
	}

}
