var locationObj;
$(document).ready(function() {
	$("#goNext").click(function() {
		goNext();
	});
	locationObj = $('.location');
	
	setLocation();
});

function goNext() {	
	var url = '/partnerStepThree';
	goPage(url);	
}

var a = ['서울', '경기', '경상', '전라', '제주'];
function setLocation() {
	for (var i = 0; i < 5; ++i) {
		var loc1 = '<button style="margin: 5px; width: 20%;" id="" type="button" class="btn btn-primary">' + a[i] + '</button>'
		locationObj.append(loc1);
	}
}
