$(document).ready(function() {
	var vGrCode = $("#txtParamGrCode").val();
	fn_setLocInputer(vGrCode);
});



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

	} else if ( vDepth == 3 ) {
		vBreadcrumb += "<li class='breadcrumb-item' data-depth='0' data-code=''><a href='#'>지역</a></li>";
		vBreadcrumb += "<li class='breadcrumb-item' data-depth='1' data-code='" + data[0].DP1_CODE + "''><a href='#'>" + data[0].DP1_CDNM + "</a></li>";
		vBreadcrumb += "<li class='breadcrumb-item' data-depth='2' data-code='" + data[0].DP2_CODE + "''><a href='#'>" + data[0].DP2_CDNM + "</a></li>";
		vBreadcrumb += "<li class='breadcrumb-item active'>선택</li>";
		$("#txtDepth1Code").val(data[0].DP1_CODE);
		$("#txtDepth2Code").val(data[0].DP2_CODE);
		$("#txtDepth3Code").val("");
		$("#txtDepth1Cdnm").val(data[0].DP1_CDNM);
		$("#txtDepth2Cdnm").val(data[0].DP2_CDNM);
		$("#txtDepth3Cdnm").val("");
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
		vResult += "<div class='btn-locSel col-4 border' data-code='"+ data[i].CODE +"' data-depth='"+data[i].DEPTH+"'>" 
		vResult +="<div class='btn-group-toggle' data-toggle='buttons'>";
		vResult +=  "<label class='btn btn-secondary active'>";
		vResult +=    "<input type='checkbox' checked autocomplete='off'> " + data[i].CODE_NM;
		vResult +=  "</label>";
		vResult +="</div>";
	    vResult += "</div>";
	    */
		 // 체크박스
		vResult += "<div class='custom-control custom-checkbox btn-locSel col-4 border' data-code='"+ data[i].CODE +"' data-depth='"+data[i].DEPTH+"'>"; 
		vResult += "<input type='checkbox' class='custom-control-input' id='customCheck_"+ data[i].CODE +"'>";
		vResult += "<label class='custom-control-label' for='customCheck_"+ data[i].CODE +"'>"+data[i].CODE_NM+"</label>";
		vResult += "</div>";
		
		/* //라디오
		vResult += "<div class='custom-control custom-radio btn-locSel col-4 border' data-code='"+ data[i].CODE +"' data-depth='"+data[i].DEPTH+"'>"; 
		vResult += "<input type='radio' class='custom-control-input' id='customCheck_"+ data[i].CODE +"' name='customRadio'>";
		vResult += "<label class='custom-control-label' for='customCheck_"+ data[i].CODE +"'>"+data[i].CODE_NM+"</label>";
		vResult += "</div>";
		*/
		
	}
	$("#divSelButtons").html(vResult);

	$(".btn-locSel").unbind("click").bind("click",function() {
		var vDepth = $(this).attr("data-depth");
		if ( vDepth == 1 || vDepth == 2 ) {
			var vGrCode = $(this).attr("data-code");
			fn_setLocInputer(vGrCode);
		} else if ( vDepth == 3 ) {
			var vCode = $(this).attr("data-code");
			if ( vCode == "ALL" ) {
				 var vTF = $("#customCheck_ALL").prop("checked") ;
				 $(".custom-control-input").attr('checked', vTF);
			}
			
		}
	});

	/////////// 목록 끝
	
	
	
}