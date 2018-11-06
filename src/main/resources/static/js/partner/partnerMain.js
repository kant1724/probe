$(document).ready(function() {
	$('#apply').click(function() {
		goApply();
	});

});

function goApply() {
	var url = '/partnerStep';
	goPage(url);
}
