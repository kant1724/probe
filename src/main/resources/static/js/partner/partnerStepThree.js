var locationObj;
$(document).ready(function() {
	$('body').css('display', 'block');
	$("#goNext").click(function() {
		goNext();
	});
	locationObj = $('.location');
	setLocation();
	$('#content').fadeIn(500);
});

function goNext() {	
	var url = '/partnerStepFour';
	goPage(url);	
}

var a = ['서울', '경기', '경상', '전라', '제주'];
function setLocation() {
	for (var i = 0; i < 5; ++i) {
		var loc1 = '<button id="" style="margin: 5px; width: 20%;" type="button" class="btn btn-primary loc1">' + a[i] + '</button>'
		locationObj.append(loc1);
	}
	$(".btn.btn-primary.loc1").click(function() {
		$("#select_div").css('display', 'block');
	});
}
