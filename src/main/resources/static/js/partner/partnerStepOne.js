$(document).ready(function() {
	$("#registerPartner").click(function() {
		registerPartner();
	});
	
});


function registerPartner() {	
	var irsNo = "";
	var option = {};
	option.url = '/registerPartnerInfo';
	option.data = {"irsNo" : irsNo};
	gf_ajax(option);
	
}