$(document).ready(function() {
	var vGrCode = $("#txtParamGrCode").val();
	fn_setLocInputer(vGrCode);
});


$("#btnLocConfirm").click(function() {
	$("#div300").modal("hide");
});

function fn_btnLocClick(obj) {
	var vDepth = $(obj).attr("data-depth");
	if ( vDepth == 1 || vDepth == 2 ) {
		var vGrCode = $(obj).attr("data-code");
		fn_setLocInputer(vGrCode);
	} else if ( vDepth == 3 ) {
		var vCode = $(obj).attr("data-code");
		if ( vCode == "ALL" ) {
			 var vTF = $("#chkLocInputEach_ALL").prop("checked") ;
			 $(".custom-control-input").attr('checked', vTF);
		}
		fn_getDongCheckList();
	}
}

function fn_getDongCheckList() {

	var aJsonArray = new Array();
	
	if ( $("#chkLocInputEach_ALL").prop("checked") ) {
		var aJson = new Object();
		aJson.code = $("#chkLocInputEach_ALL").attr("data-code");
		aJson.cdnm = $("#chkLocInputEach_ALL").attr("data-cdnm");
		aJsonArray.push(aJson);

	} else {

		$("input[id^='chkLocInputEach_']").each(function() { 
			if ( $(this).prop("checked") ) {
				var aJson = new Object();
				aJson.code = $(this).attr("data-code");
				aJson.cdnm = $(this).attr("data-cdnm");
				aJsonArray.push(aJson);
			}
		});
	}

	var vJson = new Object();
	vJson.depth1 = JSON.parse($("#txtDepth1Code").val());
	vJson.depth2 = JSON.parse($("#txtDepth2Code").val());
	vJson.depth3 = aJsonArray;
	$("#txtDepth3Code").val(JSON.stringify(vJson));
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
	var vBreadcrumb = "";
	if ( vDepth == 1 ) {
		vBreadcrumb += "<li class='breadcrumb-item' data-depth='0' data-code=''><a href='#'>지역</a></li>";
		vBreadcrumb += "<li class='breadcrumb-item active'>선택</li>";
		$("#txtDepth1Code").val("");
		$("#txtDepth2Code").val("");
		$("#txtDepth3Code").val("");
		$("#txtDepth1Cdnm").val("");
		$("#txtDepth2Cdnm").val("");
		$("#txtDepth3Cdnm").val("");

		$("#btnLocConfirm").prop('disabled', true);
	} else if ( vDepth == 2 ) {
		vBreadcrumb += "<li class='breadcrumb-item' data-depth='0' data-code=''><a href='#'>지역</a></li>";
		vBreadcrumb += "<li class='breadcrumb-item' data-depth='1' data-code='" + data[0].DP1_CODE + "''><a href='#'>" + data[0].DP1_CDNM + "</a></li>";
		vBreadcrumb += "<li class='breadcrumb-item active'>선택</li>";
		$("#txtDepth1Code").val(data[0].DP1_CODE);
		$("#txtDepth2Code").val("");
		$("#txtDepth3Code").val("");
		$("#txtDepth1Cdnm").val(data[0].DP1_CDNM);
		$("#txtDepth2Cdnm").val("");
		$("#txtDepth3Cdnm").val("");

		$("#btnLocConfirm").prop('disabled', true);
	} else if ( vDepth == 3 ) {
		vBreadcrumb += "<li class='breadcrumb-item' data-depth='0' data-code=''><a href='#'>지역</a></li>";
		vBreadcrumb += "<li class='breadcrumb-item' data-depth='1' data-code='" + data[0].DP1_CODE + "''><a href='#'>" + data[0].DP1_CDNM + "</a></li>";
		vBreadcrumb += "<li class='breadcrumb-item' data-depth='2' data-code='" + data[0].DP2_CODE + "''><a href='#'>" + data[0].DP2_CDNM + "</a></li>";
		vBreadcrumb += "<li class='breadcrumb-item active'>선택</li>";
		

		var vSi = new Object();
		var vGu = new Object();
		vSi.code = data[0].DP1_CODE;
		vSi.cdnm = data[0].DP1_CDNM
		vGu.code = data[0].DP2_CODE;
		vGu.cdnm = data[0].DP2_CDNM;

		$("#txtDepth1Code").val(JSON.stringify(vSi));
		$("#txtDepth2Code").val(JSON.stringify(vGu));
		$("#txtDepth3Code").val("");
		$("#txtDepth1Cdnm").val(data[0].DP1_CDNM);
		$("#txtDepth2Cdnm").val(data[0].DP2_CDNM);
		$("#txtDepth3Cdnm").val("");

		$("#btnLocConfirm").prop('disabled', false);
	}
	$("#navSelLoc").html(vBreadcrumb);

	$(".breadcrumb-item").click(function() {
		var vDepth = $(this).attr("data-depth");
		if ( vDepth == 0 || vDepth == 1 || vDepth == 2 ) {
			var vGrCode = $(this).attr("data-code");
			fn_setLocInputer(vGrCode);
		}
	});
	/////////// 내비게이션 바 끝
	

	/////////// 목록 시작
	var vResult = "";
	if ( data[0].DEPTH == "3" ) data.unshift({"CODE":"ALL","CODE_NM":"전체", "DEPTH":"3"});
	console.log(data);
	
	for ( var i = 0; i < data.length; i++ ) {
		//vResult += "<div class='btn-locSel col-4 border' data-code='"+ data[i].CODE +"' data-depth='"+data[i].DEPTH+"'>" + data[i].CODE_NM + "</div>";

		/* // 버튼형
		vResult += "<div class='btn-locSel col-4' data-code='"+ data[i].CODE +"' data-depth='"+data[i].DEPTH+"'>" 
		vResult +="<div class='btn-group-toggle' data-toggle='buttons'>";
		vResult +=  "<label class='btn btn-secondary active'>";
		vResult +=    "<input type='checkbox' checked autocomplete='off'> " + data[i].CODE_NM;
		vResult +=  "</label>";
		vResult +="</div>";
	    vResult += "</div>";
	    */
		
		 // 체크박스
		vResult += "<div class='custom-control custom-checkbox btn-locSel col-4 border' data-code='"+ data[i].CODE +"' data-depth='"+data[i].DEPTH+"'>"; 
		vResult += "<input type='checkbox' class='custom-control-input' id='chkLocInputEach_"+ data[i].CODE +"' data-code='"+ data[i].CODE +"' data-cdnm='"+ data[i].CODE_NM +"'>";
		vResult += "<label class='custom-control-label' for='chkLocInputEach_"+ data[i].CODE +"'>"+data[i].CODE_NM+"</label>";
		vResult += "</div>";

		/* //라디오
		vResult += "<div class='custom-control custom-radio btn-locSel col-4 border' data-code='"+ data[i].CODE +"' data-depth='"+data[i].DEPTH+"'>"; 
		vResult += "<input type='radio' class='custom-control-input' id='chkLocInputEach_"+ data[i].CODE +"' name='customRadio'>";
		vResult += "<label class='custom-control-label' for='chkLocInputEach_"+ data[i].CODE +"'>"+data[i].CODE_NM+"</label>";
		vResult += "</div>";
		*/

	}
	$("#divSelButtons").html(vResult);
	$("input[id^='chkLocInputEach_']").unbind("click").bind("click", function() { fn_onClickDealMain(this); });
	$(".btn-locSel").unbind("click").bind("click",function() { fn_btnLocClick(this); } );
	/////////// 목록 끝
}