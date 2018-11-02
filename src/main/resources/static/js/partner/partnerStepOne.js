$(document).ready(function() {
	$('body').css('display', 'block');
	$("#registerPartner").click(function() {
		registerPartner();
	});
	$("#goNext").click(function() {
		goNext();
	});
	$('#content').fadeIn(500);	
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