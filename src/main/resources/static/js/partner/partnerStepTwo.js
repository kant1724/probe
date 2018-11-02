$(document).ready(function() {
	$('body').css('display', 'block');
	$("#goNext").click(function() {
		goNext();
	});
	$('#content').fadeIn(500);
});

function goNext() {	
	var url = '/partnerStepThree';
	goPage(url);	
}
