var locationObj;
$(document).ready(function() {
	$("#goNext").click(function() {
		goNext();
	});
	$('#content').fadeIn(500);
});

function goNext() {	
	var url = '/partnerStepFour';
	goPage(url);	
}
