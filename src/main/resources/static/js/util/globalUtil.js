/*
 * 프로젝트 전반에 공통으로 쓰이는 스크립트
 * data : 파라미터 
 */
function goPage(pUrl, data, complete) {
	if ( $("#navbarTogglerDemo03").css("display") == "block" 
	  && $(".navbar-toggler").css("display") == "block"  ) {
		$(".navbar-toggler").trigger("click");
	} // 사이드메뉴 집어넣기

	$("#div120").load(pUrl, data, complete);
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

function gf_showLocInputer(pParamJson, pCallbackFunction) {
	// pParamJson 값이 있으면, 해당값 읽어서 편집모드
	// else 신규등록모드
	$("#div300").load( "cmLocInputer", function() { fn_initLocInputer(pParamJson, pCallbackFunction); } );
	$("#div300").modal("show");
	/*
	$('#div300').on('hidden.bs.modal', function (e) {
		if ( typeof pCallbackFunction == "function" ) {
			var vInRtn = $("#txtDepth3Code").val();
			var vOutRtn = null;
			
			// gf_showLocInputer를 호출하는 각화면에서
			// fn_setLocInputerCallback 를 만들어 리턴을 받으라.
			try {
				vOutRtn = JSON.parse(vInRtn);
			} catch(e) { }
			pCallbackFunction(vOutRtn);
		} 
	});
	*/
}

function gf_nvl(pStr, pIfNullStr) {
	return gf_isEmpty(pStr)? pIfNullStr : pStr;
}

function gf_isEmpty(str) {
	if ( str == null ) return true;
	if ( typeof str == "undefined" || str.length === 0 ) return true;

	str += ""; // 문자로변환
    if ( str == "undefined" || !str || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === "" ) {
        return true;
    } else {
        return false;
    }
}


function Josa(txt, josa) {
	if ( gf_isEmpty(txt) ) return "";
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


function log(pData) {
	console.log(pData);
}

function gf_findJsonIndex(pJson, pKey, pCode) {
	if ( gf_isEmpty(pJson) ) return -1;
	for ( var i = 0; i < pJson.length; i++ ) {
		if ( pJson[i][pKey] == pCode ) return i;
	}
	return -1;
}

