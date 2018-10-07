$(document).ready(function() {
	$("#txtDlStep1Param").val(fn_getCodeNm(1 ,$("#txtDlStep1ParamBefore").val()));
	if ( $("#txtDlStep1Param").val() != "" ) $("#txtStep").val("2");

	fn_setStep(fn_getStep());
});

$("#btnOkNext").click(function(){
	fn_setStep(Number(fn_getStep())+1); 
});

$(".btnDealStep").click(function(){
	var vStep = $(this).attr("data-step");
	fn_setStep(vStep);
});

function fn_setStep(pStep) {
	fn_makeMents();
	$("#txtStep").val(pStep);

	$(".btnDealStep").removeClass("active");
	$("#btnDealStep" + pStep).button('toggle');

	if ( pStep == "1" || pStep == "2" || pStep == "3" ) {
		fn_setDealStep(gvStep[pStep]);
	} else if ( pStep == "4" ) {
		gf_setLocInputer();
	} else {
		
	}
	
}

function fn_getCodeNm(pStep, pCode) {
	var pData = gvStep[pStep];
	var vRtn = pData.filter(function (pData) { return pData.CODE == pCode });
	return ( vRtn.length == 0 )? "" : vRtn[0].CODE_NM;
}

var gvStep = Array();
gvStep[0] = [];
gvStep[1] = [ {"CODE":8, "CODE_NM":"내놔요", "STEP":1}
            , {"CODE":9, "CODE_NM":"구해요", "STEP":1} ];

gvStep[2] = [ {"CODE":1, "CODE_NM":"매매", "STEP":2}
            , {"CODE":2, "CODE_NM":"전세", "STEP":2}
            , {"CODE":3, "CODE_NM":"월세", "STEP":2} ];

gvStep[3] = [ {"CODE":1, "CODE_NM":"아파트"  , "STEP":3}
            , {"CODE":2, "CODE_NM":"빌라"   , "STEP":3}
            , {"CODE":3, "CODE_NM":"단독주택", "STEP":3}
            , {"CODE":4, "CODE_NM":"오피스텔", "STEP":3}
            , {"CODE":5, "CODE_NM":"원룸"   , "STEP":3}
            , {"CODE":6, "CODE_NM":"투룸"   , "STEP":3}
            , {"CODE":7, "CODE_NM":"쓰리룸"  , "STEP":3}
            , {"CODE":8, "CODE_NM":"빌딩"   , "STEP":3}
            , {"CODE":9, "CODE_NM":"토지"   , "STEP":3} ];

function fn_setDealStep(pData) {
	var vResult = "";
	for ( var i = 0; i < pData.length; i++ ) {
		vResult += "<div class='custom-control custom-checkbox dl_dealMain col-4 border' data-code='"+ pData[i].CODE +"' data-step='"+pData[i].STEP+"'>"; 
		vResult += "<input type='checkbox' class='custom-control-input' id='customCheck_"+ pData[i].CODE +"'>";
		vResult += "<label class='custom-control-label' for='customCheck_"+ pData[i].CODE +"'>"+pData[i].CODE_NM+"</label>";
		vResult += "</div>";
	}
	$("#divDealMain").html(vResult);
	
	$(".dl_dealMain").click(function() {
		var vStep = $(this).attr("data-step");
		var vCode = $(this).attr("data-code");
		$("#txtDlStep" + vStep + "Param").val(fn_getCodeNm(vStep, vCode));
		
		console.log(vStep);
		if ( vStep == 1 ) {
			$("#btnOkNext").trigger("click");
		}

		fn_makeMents();
		if ( vStep == 1 || vStep == 2 ) {
			//fn_setDealStep(gvStep[vSTEP]);
			//fn_setStep(vSTEP);
		}
	});
	
}

$("#cmCusGet").click(function(){
	//goPage("ptWelcome");
	gf_setLocInputer();
});


$("#cmCusSet").click(function(){
	//goPage("ptWelcome");
	gf_setLocInputer();
});

function fn_getStep() {
	var vStep = $("#txtStep").val();
	if ( vStep == "" ) vStep = 1;
	return vStep;
}


function fn_makeMents() {
	var vStep  = fn_getStep();
	var vStep1 = $("#txtDlStep1Param").val();
	var vStep2 = $("#txtDlStep2Param").val();
	var vStep3 = $("#txtDlStep3Param").val();
	var vStep4 = $("#txtDlStep4Param").val();
	var vStep5 = $("#txtDlStep5Param").val();
	var vStep6 = $("#txtDlStep6Param").val();

	var vMent = "나는 원해요.";
	if ( vStep == 0 ) vMent = "나는 원해요.";
	if ( vStep == 1 ) vMent = "나는 " + vStep1;
	if ( vStep == 2 ) vMent = "나는 " + Josa(vStep2, "를") + " " + vStep1;
	if ( vStep == 3 ) vMent = "나는 " + vStep2 + "로 " + Josa(vStep3, "를") + " " + vStep1;
	if ( vStep == 4 ) vMent = "나는 " + vStep2 + "로 " + vStep4 + "지역의 "+ vStep3 + "를 "+ vStep1;
	if ( vStep == 5 ) vMent = "나는 " + vStep2 + "로 " + vStep4 + "지역의 "+ vStep5 + "정도의 "+ vStep3 + "를 "+ vStep1;

	$("#lblJumboMain").text(vMent);
	
	return vMent;
	/*
	 * 
1. 9.8
2. m,s,w
3. a,b,d,o,t,t
4.loc
5.$
6.etc

나는 원해요.
나는 구해요.
나는 (거래방법)을 구해요.
- 나는 (매매, 전세)를 구해요.
나는 (매매)로 (물건)을 구해요.
- 나는 (매매)로 (아파트, 빌라)을 구해요.
나는 (매매)로 ()지역의 (아파트)를 구해요.
나는 (매매)로 ()지역의 (9억)정도의 (아파트)를 구해요.

*/
}


/*
var vSTEP = data[0].STEP;
var vBreadcrumb = "";
if ( vSTEP == 1 ) {
	vBreadcrumb += "<li class='breadcrumb-item' data-step='0' data-code=''><a href='#'>지역</a></li>";
	vBreadcrumb += "<li class='breadcrumb-item active'>선택</li>";
	$("#txtSTEP1Code").val("");
	$("#txtSTEP2Code").val("");
	$("#txtSTEP3Code").val("");
	$("#txtSTEP1Cdnm").val("");
	$("#txtSTEP2Cdnm").val("");
	$("#txtSTEP3Cdnm").val("");
	
} else if ( vSTEP == 2 ) {
	vBreadcrumb += "<li class='breadcrumb-item' data-step='0' data-code=''><a href='#'>지역</a></li>";
	vBreadcrumb += "<li class='breadcrumb-item' data-step='1' data-code='" + data[0].DP1_CODE + "''><a href='#'>" + data[0].DP1_CDNM + "</a></li>";
	vBreadcrumb += "<li class='breadcrumb-item active'>선택</li>";
	$("#txtSTEP1Code").val(data[0].DP1_CODE);
	$("#txtSTEP2Code").val("");
	$("#txtSTEP3Code").val("");
	$("#txtSTEP1Cdnm").val(data[0].DP1_CDNM);
	$("#txtSTEP2Cdnm").val("");
	$("#txtSTEP3Cdnm").val("");

} else if ( vSTEP == 3 ) {
	vBreadcrumb += "<li class='breadcrumb-item' data-step='0' data-code=''><a href='#'>지역</a></li>";
	vBreadcrumb += "<li class='breadcrumb-item' data-step='1' data-code='" + data[0].DP1_CODE + "''><a href='#'>" + data[0].DP1_CDNM + "</a></li>";
	vBreadcrumb += "<li class='breadcrumb-item' data-step='2' data-code='" + data[0].DP2_CODE + "''><a href='#'>" + data[0].DP2_CDNM + "</a></li>";
	vBreadcrumb += "<li class='breadcrumb-item active'>선택</li>";
	$("#txtSTEP1Code").val(data[0].DP1_CODE);
	$("#txtSTEP2Code").val(data[0].DP2_CODE);
	$("#txtSTEP3Code").val("");
	$("#txtSTEP1Cdnm").val(data[0].DP1_CDNM);
	$("#txtSTEP2Cdnm").val(data[0].DP2_CDNM);
	$("#txtSTEP3Cdnm").val("");
}
$("#navSelLoc").html(vBreadcrumb);

$(".breadcrumb-item").click(function() {
	var vSTEP = $(this).attr("data-step");
	if ( vSTEP == 0 || vSTEP == 1 || vSTEP == 2 ) {
		var vGrCode = $(this).attr("data-code");
		fn_setLocInputer(vGrCode);
	}
})
*/
