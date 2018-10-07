/*
 * 프로젝트 전반에 공통으로 쓰이는 스크립트
 */
function goPage(pUrl) {
	$("#div120").load(pUrl);

	if ( $("#navbarTogglerDemo03").css("display") !== "none" ) {
		$(".navbar-toggler").trigger("click");
	}

	console.log(pUrl);
}

/* 공통 ajax 발송 ks20181007 */
function gf_ajax(option) {
	if ( option.url         == undefined ) return false;
	if ( option.type        == undefined ) option.type = "POST";
	if ( option.async       == undefined ) option.async = false;
	if ( option.contentType == undefined ) option.contentType = "application/json";
	if ( option.processData == undefined ) option.processData = false;
	if ( option.error       == undefined ) option.error = function(jqXhr, textStatus, errorMessage){ gf_comnAjaxError(jqXhr, textStatus, errorMessage);};

	if ( option.dataType    == undefined ) option.dataType = "json";
	if ( option.dataType    == "json"    ) option.data = JSON.stringify(option.data);

	$.ajax(option);
}

function gf_comnAjaxError(jqXhr, textStatus, errorMessage) {
	console.log(jqXhr);
	console.log(textStatus);
	console.log(errorMessage);
	if ( jqXhr.status == 404 ) {
		alert(textStatus);
	} else {
	}
}

function gf_setLocInputer(pDepth, pGrCode, pCode) {

	$("#txtDepth1Code").val("");
	$("#txtDepth2Code").val("");
	$("#txtDepth3Code").val("");
	$("#txtParamGrCode").val(pGrCode);
	$("#txtParamDepth").val(pDepth);
	$("#txtParamCode").val(pCode);
	if($("#layLocInputer").css("display") == "none"){
		$("#btnLocInputer").trigger("click");
	}

	$("#divLocMain").load( "cmLocInputer" );

}




function Josa(txt, josa) {
	var code = txt.charCodeAt(txt.length-1) - 44032;
	var cho = 19, jung = 21, jong=28;
	var i1, i2, code1, code2;

	// 원본 문구가 없을때는 빈 문자열 반환
	if (txt.length == 0) return '';

	// 한글이 아닐때
	if (code < 0 || code > 11171) return txt;

	if (code % 28 == 0) return txt + Josa.get(josa, false);
	else return txt + Josa.get(josa, true);
}
Josa.get = function (josa, jong) {
	// jong : true면 받침있음, false면 받침없음

	if (josa == '을' || josa == '를') return (jong?'을':'를');
	if (josa == '이' || josa == '가') return (jong?'이':'가');
	if (josa == '은' || josa == '는') return (jong?'은':'는');
	if (josa == '와' || josa == '과') return (jong?'와':'과');

	// 알 수 없는 조사
	return '**';
}


