$(document).ready(function() {
	$('#apply').click(function() {
		goApply();
	});

});

function goApply() {
	var url = '/partnerStepOne' + '?name=1'
	goPage(url);
}
