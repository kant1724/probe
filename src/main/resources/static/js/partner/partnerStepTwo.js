$(document).ready(function() {
	$("#goNext").click(function() {
		goNext();
	});
});

function goNext() {	
	var url = '/partnerStepThree';
	goPage(url);	
}
