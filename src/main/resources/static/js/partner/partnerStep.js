$(document).ready(function() {
	$('body').css('display', 'block');
	swiper = new Swiper('.swiper-container', {
		resistanceRatio: 1.5
	});
	swiper.on('slideChange', function () {
		goScrollTop();
		var index = swiper.realIndex;
		$('#stepOne').css('font-weight', '500');
		$('#stepTwo').css('font-weight', '500');
		$('#stepThree').css('font-weight', '500');
		$('#stepFour').css('font-weight', '500');
		if (index == 0) {
			$('#stepOne').css('font-weight', '700');
		} else if (index == 1) {
			$('#stepTwo').css('font-weight', '700');
		} else if (index == 2) {
			$('#stepThree').css('font-weight', '700');
		} else if (index == 3) {
			$('#stepFour').css('font-weight', '700');
		}
	});
	
	$("#registerPartner").click(function() {
		registerPartner();
	});
	$(".goNext").click(function() {
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

function registerPartner() {	
	var irsNo = "";
	var option = {};
	option.url = '/registerPartnerInfo';
	option.data = {"irsNo" : irsNo};
	gf_ajax(option);
	
}

function goNext() {	
	var index = swiper.realIndex;
	swiper.slideTo(index + 1, 0, false);
	goScrollTop();
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
			var loc = '<button id="' + codeArr[i] + '" style="font-size: 11px; margin: 5px;" type="button" class="btn btn-primary loc1">' + codeNmArr[i] + '</button>'
			locationObj.append(loc);
		}
	} else {
		for (var i = 0; i < codeNmArr.length; ++i) {
			var loc = '<label class="checkbox">' + codeNmArr[i] + '<input id="' + codeArr[i] + '" type="checkbox"><span class="checkmark"></span></label>'
			locationObj.append(loc);
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
	if (currentDepth > 1) {
		$("#back_div").css('display', 'block');
	} else {
		$("#back_div").css('display', 'none');
	}
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
	var click_trash_id = 'click_trash_' + $('#location_selected_table').children().length; 
	var tbody = '<tr><td>' + currentSi + '</td><td>' + currentGu + '</td><td>' + total + '건</td>';
		tbody += '<td class="delete-location"><i id="' + click_trash_id + '" class="fal fa-trash-alt"></i></td></tr>';
	$('#location_selected_table').append(tbody);
	$('#' + click_trash_id).click(function() {
		$(this).parent().parent().remove();
	});
	var f = $('#location_selected_table').children();
	$(f[f.length - 1]).hide();
	$(f[f.length - 1]).fadeIn(500);
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

function goScrollTop() {
	$("html, body").animate({ scrollTop: 0 }, "fast");
}
