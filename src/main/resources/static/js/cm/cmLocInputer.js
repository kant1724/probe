$(document).ready(function() {
	var vGrCode = $("#txtParamGrCode").val();
	fn_setLocInputer(vGrCode);
});

var gvReturnValue = new Object();
function fn_initLocInputer(pParamJson, pCallbackFunction) {
	gvReturnValue.status = "onLoad";
	$("#btnLocConfirm").unbind("click").bind("click", function() {
		
		if ( gf_isEmpty(gvReturnValue.depth3)
	      || gvReturnValue.depth3.length == 0 ) {
			alert("선택된 값이 없습니다.");
			return;
		} 
		
		$("#div300").modal("hide");
		if ( typeof pCallbackFunction == "function" ) {
			gvReturnValue.status = "OK";
			log("localInputer");
			log(gvReturnValue);
			pCallbackFunction(gvReturnValue);
		} 
	});
}


$("#btnLocConfirm").click(function() {
	$("#div300").modal("hide");
});


function fn_btnLocClick(obj) {
	var vDepth = $(obj).data("depth");
	if ( vDepth == 1 || vDepth == 2 ) {
		var vGrCode = $(obj).data("code");
		fn_setLocInputer(vGrCode);

	} else if ( vDepth == 3 ) {
		fn_getDongCheckList(obj);
	}
}

function fn_getDongCheckList(obj) {
	if ( $(obj).prop("id") == "chkLocInputEach_ALL" ) {
		var vTF = $(obj).prop("checked");
		$("input[id^='chkLocInputEach_']").prop("checked", vTF);
	}

	var aJsonArray = new Array();

	if ( $("#chkLocInputEach_ALL").prop("checked") ) {
		var aJson = new Object();
		aJson.code = $("#chkLocInputEach_ALL").data("code");
		aJson.cdnm = $("#chkLocInputEach_ALL").data("cdnm");
		aJsonArray.push(aJson);

	} else {
		$("input[id^='chkLocInputEach_']").each(function() { 
			if ( $(this).prop("checked") ) {
				var aJson = new Object();
				aJson.code = $(this).data("code");
				aJson.cdnm = $(this).data("cdnm");
				aJsonArray.push(aJson);
			}
		});
	}
	gvReturnValue.depth3 = aJsonArray;
}

function fn_setLocInputer(pGrCode) {
	var input_data = { "grCode" : pGrCode };
	var option = { url:"/cmFnGetLocCdnmList"
		         , data: input_data
		         , success: function (data, status, xhr) {fn_setLocInputerCallback(data, status, xhr);}
				 };
	gf_ajax(option);
}

function fn_setLocInputerCallback(data, status, xhr) {
	
	if ( data.length <= 0 ) alert("치명적오류");
	
	/////////// 내비게이션 바 시작
	var vDepth = data[0].DEPTH;
	var vBreadcrumb ="<li class='breadcrumb-item' data-depth='0' data-code=''><a href='#'>지역</a></li>";
	if ( vDepth == 1 ) {
		vBreadcrumb += "<li class='breadcrumb-item active'>선택</li>";
		$("#btnLocConfirm").prop('disabled', true);
	} else if ( vDepth == 2 ) {
		vBreadcrumb += "<li class='breadcrumb-item' data-depth='1' data-code='" + data[0].DP1_CODE + "''><a href='#'>" + data[0].DP1_CDNM + "</a></li>";
		vBreadcrumb += "<li class='breadcrumb-item active'>선택</li>";

		$("#btnLocConfirm").prop('disabled', true);
	} else if ( vDepth == 3 ) {
		vBreadcrumb += "<li class='breadcrumb-item' data-depth='1' data-code='" + data[0].DP1_CODE + "''><a href='#'>" + data[0].DP1_CDNM + "</a></li>";
		vBreadcrumb += "<li class='breadcrumb-item' data-depth='2' data-code='" + data[0].DP2_CODE + "''><a href='#'>" + data[0].DP2_CDNM + "</a></li>";
		vBreadcrumb += "<li class='breadcrumb-item active'>선택</li>";

		$("#btnLocConfirm").prop('disabled', false);
	}

	var vSi = new Object();
	var vGu = new Object();
	vSi.code = data[0].DP1_CODE;
	vSi.cdnm = data[0].DP1_CDNM
	vGu.code = data[0].DP2_CODE;
	vGu.cdnm = data[0].DP2_CDNM;

	gvReturnValue.depth1 = vSi;
	gvReturnValue.depth2 = vGu;
	gvReturnValue.depth3 = null;

	$("#navSelLoc").html(vBreadcrumb);

	$(".breadcrumb-item").click(function() {
		var vDepth = $(this).data("depth");
		if ( vDepth == 0 || vDepth == 1 || vDepth == 2 ) {
			var vGrCode = $(this).data("code");
			fn_setLocInputer(vGrCode);
		}
	});
	/////////// 내비게이션 바 끝
	

	/////////// 목록 시작
	var vResult = "";
	if ( data[0].DEPTH == "3" ) data.unshift({"CODE":"ALL","CODE_NM":"전체", "DEPTH":"3"});

	var vResult = Mustache.render($("#locButtonTemplate").html(), data);
	$("#divSelButtons").html(vResult);
	
	//$(".btnLocSel").off("click").on("click", function() { fn_btnLocClick(this); } );
	
	//if ( data[0].DEPTH == "3" ) $("#chkLocInputEach_ALL").addClass("chkChkboxAll");

	//if ( data[0].DEPTH == "1" || data[0].DEPTH == "2" ) gf_btnChkboxNoChk($(".chkChkbox")); // 체크박스 없다.
	
	$(".chkLocInputEach").off("click").on("click", function () {
		fn_btnLocClick(this);
	} );


}