/*
 * 프로젝트 전반에 공통으로 쓰이는 스크립트
 */
function goPage(pUrl) {
	$("#div120").load(pUrl);
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






