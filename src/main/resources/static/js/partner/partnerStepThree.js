var locationObj;
$(document).ready(function() {
	$('body').css('display', 'block');
	$("#goNext").click(function() {
		goNext();
	});
	$("#select").click(function() {
		$("#select_div").css('display', 'none');
		currentDepth = 0;
		addAddress();
		if ($('.location-selected').css('display') == 'none') {
			$('.location-selected').fadeIn(500);
		}
		selectAddress("");
	});
	locationObj = $('.location');
	selectAddress("");	
	$('#content').fadeIn(500);
});

function goNext() {	
	var url = '/partnerStepFour';
	goPage(url);	
}

var currentDepth = 0;
var currentSi = '';
var currentGu = '';
var currentDong = '';
var codeArr = [];
var codeNmArr = [];

function setLocation() {
	locationObj.empty();
	if (currentDepth < 3) {
		for (var i = 0; i < codeNmArr.length; ++i) {
			locationObj.hide();
			var loc = '<button id="' + codeArr[i] + '" style="font-size: 11px; margin: 5px;" type="button" class="btn btn-primary loc1">' + codeNmArr[i] + '</button>'
			locationObj.append(loc);
			locationObj.fadeIn(200);
		}
	} else {
		for (var i = 0; i < codeNmArr.length; ++i) {
			locationObj.hide();
			var loc = '<label class="checkbox">' + codeNmArr[i] + '<input id="' + codeArr[i] + '" type="checkbox"><span class="checkmark"></span></label>'
			locationObj.append(loc);
			locationObj.fadeIn(200);
		}
	}
	$(".btn.btn-primary.loc1").click(function() {
		if (currentDepth < 3) {
			var grCode = $(this).prop('id');
			if (currentDepth == 1) {
				currentSi = $(this).text();
			} else if (currentDepth == 2) {
				currentGu = $(this).text();
			}
			selectAddress(grCode);
		}
	});
	if (currentDepth == 3) {
		$("#select_div").css('display', 'block');
	}
}

function addAddress() {
	var total = 0;	
	var checkboxObj = $('.checkbox').children();
	for (var i = 0; i < checkboxObj.length; ++i) {
		if ($(checkboxObj[i]).is(":checked")) {
			total += 1;
		}
	}
	var tbody = '<tr><td>' + currentSi + '</td><td>' + currentGu + '</td><td>' + total + '개 동</td>';
	$('#location_selected_table').append(tbody);
}

function selectAddress(grCode) {
	var option = {};
		option.url = '/dlFnGetLocCdnmList';
		option.success = function(data, status, xhr) {
			codeArr = [];
			codeNmArr = [];
			for (var i = 0; i < data.length; ++i) {
				var code = data[i].CODE;
				var codeNm = data[i].CODE_NM;
				var depth = data[i].DEPTH;
				var grCode = data[i].GR_CODE;
				var dp1Code = data[i].DP1_CODE;
				var dp1Code = data[i].DP1_CONM;
				var dp2Code = data[i].DP2_CODE;
				var dp2Cdnm = data[i].DP2_CDNM;
				var dp3Code = data[i].DP3_CODE;
				var dp3Cdnm = data[i].DP3_CDNM;
				codeArr.push(code);
				codeNmArr.push(codeNm);
			}
			currentDepth += 1;
			setLocation();
		};
        option.data = {"grCode" : grCode};
	gf_ajax(option);
}
