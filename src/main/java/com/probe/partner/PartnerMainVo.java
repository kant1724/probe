package com.probe.partner;

public class PartnerMainVo {
	String irsNo;
	String vendorName;
	String ceoName;
	String telNo1;
	String address;
	String applicantName;
	String applicantTelNo;
	String areaCode;
	
	public PartnerMainVo(String irsNo, String vendorName, String ceoName, String telNo1, String address,
			String applicantName, String applicantTelNo, String areaCode) {
		super();
		this.irsNo = irsNo;
		this.vendorName = vendorName;
		this.ceoName = ceoName;
		this.telNo1 = telNo1;
		this.address = address;
		this.applicantName = applicantName;
		this.applicantTelNo = applicantTelNo;
		this.areaCode = areaCode;
	}

	public String getIrsNo() {
		return irsNo;
	}
	public void setIrsNo(String irsNo) {
		this.irsNo = irsNo;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public String getCeoName() {
		return ceoName;
	}
	public void setCeoName(String ceoName) {
		this.ceoName = ceoName;
	}
	public String getTelNo1() {
		return telNo1;
	}
	public void setTelNo1(String telNo1) {
		this.telNo1 = telNo1;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getApplicantName() {
		return applicantName;
	}
	public void setApplicantName(String applicantName) {
		this.applicantName = applicantName;
	}
	public String getApplicantTelNo() {
		return applicantTelNo;
	}
	public void setApplicantTelNo(String applicantTelNo) {
		this.applicantTelNo = applicantTelNo;
	}
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
}
