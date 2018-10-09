$(document).ready(function() {
	fn_setStep(1);
	fn_onStep(1);

	// 보통 구해요/팔아요...는 선택한 상태에서 본 레이어가 열린다. 파라미터 처리로 step 1 패스하는 로직
	var vBeforeParam = fn_getCodeNm(1 ,$("#txtDlBeCode1").val());
	if ( !gf_isEmpty(vBeforeParam) ) {
		$("input[id^='chkDealMain_'][data-code='" + $("#txtDlBeCode1").val() +"']").attr('checked', true);
		fn_saveStepParam();
		fn_goStep(2);
	}
});

var gvDealInfo = Array(); // TODO

// 다음버튼 클릭
$("#btnOkNext").click(function(){
	var vStep = fn_getStep();
	var vNextStep = vStep + 1;
	fn_goStep(vNextStep);
});

// 탭바 클릭
$(".nav-item a").on("click", function () {
	var vStep = $(this).attr("data-step");
	fn_goStep(vStep);
})

function fn_getStep() {	return gf_isEmpty($("#txtStep").val())? 1 : Number($("#txtStep").val()); }

function fn_setStep(pStep) {
	$("#txtStep").val(pStep);
}

// 스텝에서 빠져나갈수 있으면 다음 스텝 세팅
function fn_goStep(pStep) {
	if ( !fn_canIgoToStep(pStep) ) return;
	fn_outStep();
	fn_onStep(pStep);
}

// 스텝 종료 세팅
function fn_outStep() {
	var vStep = fn_getStep();
	fn_saveStepParam(); // 스텝별 결과 세팅
	fn_makeMents(); // 점보트론
	return true;
}

// 스텝 진입 세팅
function fn_onStep(pStep) {
	pStep += "";
	$("#txtStep").val(pStep);
	$("#tabDealStep" + pStep).tab("show");

	if ( pStep == "1" || pStep == "2" || pStep == "3" ) {
		var vData = gvStep[pStep];
		var vResult = "";
		for ( var i = 0; i < vData.length; i++ ) {
			vResult += "<div class='custom-control custom-checkbox dl_dealMain col-4 border' data-code='"+ vData[i].CODE +"' data-step='"+vData[i].STEP+"'>"; 
			vResult += "<input type='checkbox' class='custom-control-input' id='chkDealMain_"+ vData[i].CODE +"' data-cdnm='" + vData[i].CODE_NM + "' data-code='"+ vData[i].CODE +"' data-step='"+vData[i].STEP+"'>";
			vResult += "<label class='custom-control-label' for='chkDealMain_"+ vData[i].CODE +"'>"+vData[i].CODE_NM+"</label>";
			vResult += "</div>";
		}
		$("#divDealMain").html(vResult);
		$("input[id^='chkDealMain_']").unbind("click").bind("click", function() { fn_onClickDealMain(this); });

	} else if ( pStep == "4" ) {
		
		try {
			// TODO
		} catch(e) {
		}
		$("#divDealMain").html("");
		gf_showLocInputer();
	} else {
		
	}
}

function fn_onClickDealMain(obj) {
	var vStep = $(obj).attr("data-step");

	fn_saveStepParam();
	fn_makeMents();

	if ( vStep == 1 ) fn_goStep(2);
}

function fn_saveStepParam() {
	var vStep = fn_getStep();

	if ( vStep == "1" || vStep == "2" || vStep == "3" ) {
		var aJsonArray = new Array();
	
		$("input[id^='chkDealMain_']").each(function() { 
			if ( $(this).prop("checked") ) {
				var aJson = new Object();
				aJson.code = $(this).attr("data-code");
				aJson.cdnm = $(this).attr("data-cdnm");
				aJsonArray.push(aJson);
				//vStep = $(this).attr("data-step");
			}
		});
		
		if ( gf_isEmpty(vStep) ) return;
	
		var vJson = new Object();
		vJson.step = vStep;
		vJson.data = aJsonArray;
		
		gvDealInfo[vStep] = vJson;
		$("#txtDlCode" + vStep).val(JSON.stringify(vJson));

	} else if ( vStep == "4" ) {
		// TODO
		//var vJson = new Object();
		//vJson = $("#txtDlCode4").val()
		
		//gvDealInfo[vStep] = vJson;
		//$("#txtDlCode" + vStep).val(JSON.stringify(vJson));
	}

	$("input[id^='txtDlCode']").each(function() { 
        //console.log($(this).prop('id'));
        //console.log($(this).prop('id') + ":"+ ($(this).attr("data-step")> vStep));
		if ( $(this).attr("data-step") > vStep ) {
			$(this).val("");
		    //$("#tabDealStep" + $(this).attr("data-step")).addClass("disabled");
		} else {
		    //$("#tabDealStep" + $(this).attr("data-step")).removeClass("disabled");
		}
	});
	
	//console.log( JSON.stringify(vJson) );
}

function fn_showLocInputerCallback(pReturnValue) {
	var vResult = "";
	try {
		if ( pReturnValue.depth1.length <= 0 ) return;
		// var vJson = JSON.parse($("#txtDlCode4").val());
		// pReturnValue 는 JSON 객체이다.
		// 체크 후,
		vResult = JSON.stringify(pReturnValue);
	} catch(e) {}
	
	console.log("vResult : " + vResult);

	var vJson = new Object();
	vJson.step = 4;
	vJson.data = pReturnValue;

	if ( !gf_isEmpty(vResult) ) $("#txtDlCode4").val(JSON.stringify(vJson));
	$("#divDealMain").html($("#txtDlCode4").val());
}



function fn_canIgoToStep(pStep) {
	var vNowStep = fn_getStep();
	var vGotoStep = Number(pStep);

	if ( vGotoStep <= vNowStep ) return true;
	
	var vLength = 0; // 이전단계에 파라메터 세팅이 빈값이 아니어야함.
	try {
		var vJson = new Object();
		vJson = JSON.parse($("#txtDlCode"+ (vGotoStep-1)).val());
		vLength = vJson.data.length;
	} catch(e) { }
	if ( vLength == 0 ) return false;
	
	return true;
}

function fn_getCodeNm(pStep, pCode) {
	var pData = gvStep[pStep];
	var vRtn = pData.filter(function (pData) { return pData.CODE == pCode });
	return ( vRtn.length == 0 )? "" : vRtn[0].CODE_NM;
}

var gvStep = Array();
gvStep[0] = [];
gvStep[1] = [ {"CODE":9, "CODE_NM":"구해요", "STEP":1}
            , {"CODE":8, "CODE_NM":"내놔요", "STEP":1} ];

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

function fn_getJsonParam(pStep) {
	var vStr  = "";
	var vJson = new Object();
	var vData = $("#txtDlCode" + pStep).val();
	if ( gf_isEmpty(vData) ) return vStr;

	try {
		var vJson = JSON.parse(vData);
		var vLen = vJson.data.length;
		if ( vLen == 0 ) {
		} else if ( vLen == 1 ) {
			vStr = vJson.data[0].cdnm;
		} else {
			for ( var i = 0; i < vLen; i++ ) {
				vStr += (i>0?", ":"") + vJson.data[i].cdnm;
			}
			//vStr = "(" + vStr + ")";
		}
	} catch(e) { }
	return vStr;
}

function fn_makeMents() {
	var vStep1 = fn_getJsonParam(1);
	var vStep2 = fn_getJsonParam(2);
	var vStep3 = fn_getJsonParam(3);
	var vStep4 = fn_getJsonParam(4);
	var vStep5 = fn_getJsonParam(5);
	var vStep6 = fn_getJsonParam(6);
	
	var vMent = "나는 원해요.";
	if ( !gf_isEmpty(vStep1) ) vMent = "나는 " + vStep1;
	if ( !gf_isEmpty(vStep2) ) vMent = "나는 " + Josa(vStep2, "를") + " " + vStep1;
	if ( !gf_isEmpty(vStep3) ) vMent = "나는 " + vStep2 + "로 " + Josa(vStep3, "를") + " " + vStep1;
	if ( !gf_isEmpty(vStep4) ) vMent = "나는 " + vStep2 + "로 " + vStep4 + "지역의 "+ vStep3 + "를 "+ vStep1;
	if ( !gf_isEmpty(vStep5) ) vMent = "나는 " + vStep2 + "로 " + vStep4 + "지역의 "+ vStep5 + "정도의 "+ vStep3 + "를 "+ vStep1;

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

