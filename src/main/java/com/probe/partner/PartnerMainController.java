package com.probe.partner;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PartnerMainController {
	@Autowired
	PartnerMainService partnerMainService;
	
	@RequestMapping("/partnerMain")
	public String partnerMain(Model model) {
		return "partner/partnerMain";
	}
	
	@RequestMapping(value = "/partnerStep", method = RequestMethod.GET)
	public String partnerStepOne(Model model) {
		return "partner/partnerStep";
	}
	
	@RequestMapping(value = "/partnerStepEnd", method = RequestMethod.GET)
	public String partnerStepEnd(Model model) {
		return "partner/partnerStepEnd";
	}
	
	@RequestMapping(value = "/completeRegistration", method = RequestMethod.POST)
	@ResponseBody
	public List<PartnerMainVo> completeRegistration(@RequestBody Map<String,Object> body, Model model) {
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
		
		List<PartnerMainVo> retList = new ArrayList<PartnerMainVo>();
		retList.add(new PartnerMainVo());
		
		return retList;
	}
}
