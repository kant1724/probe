package com.probe.partner;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

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
	
	@RequestMapping("/completeRegistration")
	public String completeRegistration(@RequestBody Map<String,Object> body) {
		String irsNo = body.get("irsNo").toString();
		String vendorName = body.get("vendorName").toString();
		String ceoName = body.get("ceoName").toString();
		String telNo1 = body.get("telNo1").toString();
		String address = body.get("address").toString();
		String applicantName = body.get("applicantName").toString();
		String applicantTelNo = body.get("applicantTelNo").toString();
		String areaCode = body.get("areaCode").toString();
		
		PartnerMainVo partnerMainVo = new PartnerMainVo(irsNo, vendorName, ceoName, telNo1, address, applicantName, applicantTelNo, areaCode);
		
		partnerMainService.insertPartnerInfo(partnerMainVo);
		
		return "partner/partnerStep";
	}
}
