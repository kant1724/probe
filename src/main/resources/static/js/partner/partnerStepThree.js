var locationObj;
$(document).ready(function() {
	$('body').css('display', 'block');
	$("#goNext").click(function() {
		goNext();
	});
	$("#select").click(function() {
		$("#select_div").css('display', 'none');
		currentDepth = 1;
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

var currentDepth = 1;
var codeArr = [];
var codeNmArr = [];
function setLocation() {
	locationObj.empty();
	for (var i = 0; i < codeNmArr.length; ++i) {
		var loc1 = '<button id="' + codeArr[i] + '" style="font-size: 11px; margin: 5px;" type="button" class="btn btn-primary loc1">' + codeNmArr[i] + '</button>'
		locationObj.append(loc1);
	}
	$(".btn.btn-primary.loc1").click(function() {
		if (currentDepth < 3) {
			var grCode = $(this).prop('id');
			selectAddress(grCode);
			currentDepth += 1;
		}
	});
	if (currentDepth == 2) {
		$("#select_div").css('display', 'block');
	}
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
			setLocation();
		};
        option.data = {"grCode" : grCode};
	gf_ajax(option);
}
