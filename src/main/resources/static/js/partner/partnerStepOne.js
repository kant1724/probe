$(document).ready(function() {
	$("#registerPartner").click(function() {
		registerPartner();
	});
	$("#goNext").click(function() {
		goNext();
	});
});


function registerPartner() {	
	var irsNo = "";
	var option = {};
	option.url = '/registerPartnerInfo';
	option.data = {"irsNo" : irsNo};
	gf_ajax(option);
	
}

function goNext() {	
	var url = '/partnerStepTwo';
	goPage(url);	
}