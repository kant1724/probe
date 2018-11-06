$(document).ready(function() {
	$('#apply').click(function() {
		goApply();
	});

});

function goApply() {
	var url = '/partnerStep' + '?name=1'
	goPage(url);
}
