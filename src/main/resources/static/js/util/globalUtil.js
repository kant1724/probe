/*
 * 프로젝트 전반에 공통으로 쓰이는 스크립트
 */
function goPage(pUrl) {
	$("#div120").load(pUrl);
	console.log(pUrl);
}

function gf_setLocInputer() {
	

	$("#btnLocInputer").trigger("click");
	$("#divLocMain").load( "cmLocInputer" );

	return;
	console.log($("#layCmLocInputer").length);
	if ( $("#layCmLocInputer").length == 0 ) {
		$("#div130").load( "cmLocInputer", function() {
			$("#layCmLocInputer").fadeIn();
			console.log($("#layCmLocInputer").length);
		} );
	}

	
	
	
}