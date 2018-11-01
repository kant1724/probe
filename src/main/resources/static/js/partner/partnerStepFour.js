var locationObj;
$(document).ready(function() {
	$("#goNext").click(function() {
		goNext();
	});
});

function goNext() {	
	var url = '/partnerStepFour';
	goPage(url);	
}
