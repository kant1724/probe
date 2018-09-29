package com.probe.comn;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CMComnController {
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
	

}
