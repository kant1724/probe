$(document).ready(function() {
	fn_setStep(1);
	fn_onStep(1);

	// 보통 구해요/팔아요...는 선택한 상태에서 본 레이어가 열린다. 파라미터 처리로 step 1 패스하는 로직
	var vBeforeParam = fn_getcodeNm(1 ,$("#txtDlBeCode1").val());
	if ( !gf_isEmpty(vBeforeParam) ) {
		$("input[id^='chk_btnDealMain_'][data-code='" + $("#txtDlBeCode1").val() +"']").attr('checked', true);
		fn_saveStepParam();
		fn_goStep(2);
	}
});

var gvDealInfo = Array();

// 다음버튼 클릭
$("#btnOkNext").click(function(){
	var vStep = fn_getStep();
	var vNextStep = vStep + 1;
	fn_goStep(vNextStep);
});

// 탭바 클릭
$(".dlNavDivCol").on("click", function () {
	var vStep = $(this).data("step");
	fn_goStep(vStep);
})

function fn_getStep() {	return gf_isEmpty(gvDealInfo[0])? 1 : Number(gvDealInfo[0].step); }
function fn_setStep(pStep) { 
	if ( gf_isEmpty(gvDealInfo[0]) ) gvDealInfo[0] = new Object();
	gvDealInfo[0].step = pStep;
}

// 스텝에서 빠져나갈수 있으면 다음 스텝 세팅
function fn_goStep(pStep) {
	if ( !fn_canIgoToStep(pStep) ) return;
	fn_outStep();
	if ( !fn_canIgoToStep(pStep) ) return;
	fn_onStep(pStep)

	//$(".dlNavDivCol").removeClass("dlNavDivColActive");
	//$(".dlNavDivCol[data-step^='" +pStep +"']").addClass("dlNavDivColActive"); 
	

	$(".dlNavDivCol").removeClass("z-depth-5").addClass("z-depth-1");
	$(".dlNavDivCol[data-step^='" +pStep +"']").addClass("z-depth-5"); 
	
	
	
}

// 스텝 종료 세팅
function fn_outStep() {
	var vStep = fn_getStep();
	fn_saveStepParam(); // 스텝별 결과 세팅
	fn_makeMents(); // 점보트론
}



// 스텝 진입 세팅
function fn_onStep(pStep) {
	pStep += "";
	fn_setStep(pStep);
	$("#tabDealStep" + pStep).tab("show");

	if ( pStep == "1" || pStep == "2" || pStep == "3" ) {
		var vData = gvStep[pStep];
		var vResult = Mustache.render($("#stepCardTemplate").html(), vData);
		$("#divDealMain").html(vResult);

		//if ( pStep == "1" ) gf_btnChkboxNoChk($(".chkChkbox")); // 체크박스 없다.
		//gf_btnChkboxEvent($(".btnChkbox"), $(".chkChkbox"), function(obj) { fn_onClickDealMain(obj); });
		
		$(".chkBtnDealItem").off("click").on("click", function () {
			fn_onClickDealMain(this);
		} );

	} else if ( pStep == "4" ) {
		fn_step4Draw();
		if ( fn_isDealInfoEmpty(4) ) { // 기등록건 없으면 화면 지우고 지역선택기 작동
			gf_showLocInputer( null, function(pData) {
				fn_step4JsonSaver(pData);
				fn_step4Draw();
				fn_makeMents();
			} );
		} else { // 기등록건 그림
		}
	} else if ( pStep == "5" ) {
		// 방식을 읽어서 금액대 입력
		//var vData = gvDealInfo[2].data;
		var vResult = "";
		var vData = gvStep[2];
		
		for ( var i = 0; i < vData.length; i++ ) {
			vResult += "<div class='input-group sr-only' id='divDealAmt_" + vData[i].code + "'>";
			vResult += "  <div class='input-group-prepend'>";
			vResult += "    <span class='input-group-text'>" + vData[i].cdnm + "</span>";
			vResult += "  </div>";
			vResult += "  <input type='number' class='form-control' id='txtDealAmt_" + vData[i].code +"' placeholder='" + vData[i].palceHolder + "'>";
			if ( vData[i].code == "3" ) vResult += "  <input type='number' class='form-control' id='txtDealAmt_" + vData[i].code +"_2' placeholder='월세'>";
			vResult += "  <div class='input-group-append'>";
			vResult += "    <span class='input-group-text'>만원 선</span>";
			vResult += "  </div>";
			vResult += "</div>";
		}
		$("#divDealMain").html(vResult);

		var vData2 = gvDealInfo[2].data;
		for ( var i = 0; i < vData2.length; i++ ) {
			log("divDealAmt_" + vData2[i].code);
			$("#divDealAmt_" + vData2[i].code).removeClass("sr-only");
		}
		
	} else if ( pStep == "6" ) {
		// 방식을 읽어서 금액대 입력
		var vData = gvDealInfo[2].data;
		var vResult = "";
		vResult += "<i class=\"fal fa-pen-square\"></i> <label for='txtDealEct'>요청사항</label>";
		vResult += "  <textarea class='form-control' id='txtDealEct' aria-label='With textarea' placeholder='예) 집크기, 학군중요'></textarea>";

		$("#divDealMain").html(vResult);
	} else if ( pStep == "7" ) {
		// 완료
		var vResult = fn_makeMents() + gvDealInfo[6].data[0].cdnm;
		
		$("#divDealMain").html(vResult);
		
	} else {
		
	}
}

function fn_step4Draw() {
	$("#divDealMain").html("");
	if ( fn_isDealInfoEmpty(4) ) return;

	var vData = gvDealInfo[4].data;
	var vResult = "";
	for ( var i = 0; i < vData.length; i++ ) {
		vResult += "<div class='card'><div class='card-header'>" + vData[i].depth1.cdnm + " " + vData[i].depth2.cdnm + "</div>";
		vResult += "<div class='card-body'><p class='card-text'>";
		for ( var j = 0; j < vData[i].depth3.length; j++ ) {
			vResult += ((j==0)?"":", ") + vData[i].depth3[j].cdnm;
		}
		vResult += "</p></div></div>";
	}
	$("#divDealMain").html(vResult);
}

function fn_step4JsonSaver(pData) {
	if ( gf_isEmpty(pData) ) return;
	if ( pData.status != "OK" ) return;

	if ( fn_isDealInfoEmpty(4) ) {
		var vJson = new Object();
		var aJsonArray = new Array();
		aJsonArray.push(pData);
		vJson.step = 4;
		vJson.data = aJsonArray;
		gvDealInfo[4] = vJson;

	} else {
		var vEditTF = false;
		for ( var i = 0; i < gvDealInfo[4].data.length; i++ ) { // 기선택된 구는 편집.
			if ( gvDealInfo[4].data[i].depth1.code == pData.depth1.code
		      && gvDealInfo[4].data[i].depth2.code == pData.depth2.code ) {
				gvDealInfo[4].data[i].depth3 = pData.depth3;
				vEditTF = true;
				break;
			}
		}
		if ( !vEditTF ) { // 기선택 없으면 푸시
			gvDealInfo[4].data.push(pData);
		}
	}
}

function fn_isDealInfoEmpty(pStep) {
	if ( gf_isEmpty(gvDealInfo[pStep]) ) return true;
	if ( gvDealInfo[pStep].data.length == 0 ) return true;
	return false;
}

function fn_onClickDealMain(obj) {
	fn_saveStepParam();
	fn_makeMents();

	if ( fn_getStep() == 1 ) fn_goStep(2);
}

function fn_saveStepParam(pData) {
	var vStep = fn_getStep();

	if ( vStep == "1" || vStep == "2" || vStep == "3" ) {
		var aJsonArray = new Array();

		$(".chkBtnDealItem").each(function() { 
			if ( $(this).prop("checked") ) {
				var aJson = new Object();
				aJson.code = $(this).data("code");
				aJson.cdnm = $(this).data("cdnm");
				aJsonArray.push(aJson);
				//vStep = $(this).data("step");
			}
		});

		if ( gf_isEmpty(vStep) ) return;

		var vJson = new Object();
		vJson.step = vStep;
		vJson.data = aJsonArray;

		gvDealInfo[vStep] = vJson;

	} else if ( vStep == "4" ) {
		// 이미 세이브되어있어.
	} else if ( vStep == "5" ) {

		var aJsonArray = new Array();
		
		for ( var i = 1; i <=3; i++ ) {
			if ( !$("#divDealAmt_" + i).hasClass("sr-only") ) {
				var k = gf_findJsonIndex(gvDealInfo[2].data, "code", i);
				if ( k < 0 ) continue;
				gvDealInfo[2].data[k].amt = $("#txtDealAmt_" + i).val();
				if ( i == 3 ) gvDealInfo[2].data[k].amt2 = $("#txtDealAmt_3_2").val();

				//--------------------
				var aJson = new Object();
				aJson.code = $("#txtDealAmt_" + i).attr("id");
				aJson.cdnm = $("#txtDealAmt_" + i).val();
				if ( i == 3 ) aJson.cdnm2= $("#txtDealAmt_3_2").val();
				aJsonArray.push(aJson);
				//--------------------
			}
		}
		
		var vJson = new Object();
		vJson.step = vStep;
		vJson.data = aJsonArray;

		gvDealInfo[vStep] = vJson;

	} else if ( vStep == "6" ) {

		var aJsonArray = new Array();
		var aJson = new Object();
		aJson.code = vStep;
		aJson.cdnm = $("#txtDealEct").val();
		aJsonArray.push(aJson);
		
		var vJson = new Object();
		vJson.step = vStep;
		vJson.data = aJsonArray;

		gvDealInfo[vStep] = vJson;
	} 
	
	// TODO 지우기
	for ( var i = 0; i < gvDealInfo.length; i++ ) {
		if ( i > vStep ) {
			gvDealInfo[i] = null;
		}
	}
}

function fn_canIgoToStep(pStep) {
	if ( pStep == 1 ) return true;
	var vNowStep = fn_getStep();
	var vGotoStep = Number(pStep);
	
	//log("fn_canIgoToStep : " + vNowStep + "/" + vGotoStep);

	if ( vGotoStep <= vNowStep ) return true;
	
	// 이전단계에 파라메터 세팅이 빈값이 아니어야함.
	//if ( fn_isDealInfoEmpty(vGotoStep-1) ) return false;

	return true;
}

function fn_getcodeNm(pStep, pCode) {
	var pData = gvStep[pStep];
	var vRtn = pData.filter(function (pData) { return pData.code == pCode });
	return ( vRtn.length == 0 )? "" : vRtn[0].cdnm;
}

var gvStep = Array();
gvStep[0] = [];
gvStep[1] = [ {"code":9, "cdnm":"구해요", "STEP":1}
            , {"code":8, "cdnm":"내놔요", "STEP":1} ];

gvStep[2] = [ {"code":1, "cdnm":"매매", "STEP":2, "palceHolder":"매매대금"}
            , {"code":2, "cdnm":"전세", "STEP":2, "palceHolder":"보증금"}
            , {"code":3, "cdnm":"월세", "STEP":2, "palceHolder":"보증금"} ];

gvStep[3] = [ {"code":1, "cdnm":"아파트"  , "STEP":3}
            , {"code":2, "cdnm":"빌라"   , "STEP":3}
            , {"code":3, "cdnm":"단독주택", "STEP":3}
            , {"code":4, "cdnm":"오피스텔", "STEP":3}
            , {"code":5, "cdnm":"원룸"   , "STEP":3}
            , {"code":6, "cdnm":"투룸"   , "STEP":3}
            , {"code":7, "cdnm":"쓰리룸"  , "STEP":3}
            , {"code":8, "cdnm":"빌딩"   , "STEP":3}
            , {"code":9, "cdnm":"토지"   , "STEP":3} ];

function fn_getJsonParam(pStep) {
	if ( fn_isDealInfoEmpty(pStep) ) return "";

	var vStr  = "";
	var vJson = gvDealInfo[pStep].data;

	if ( pStep == "4" ) vJson = gvDealInfo[pStep].data[0].depth3;

	var vLen = vJson.length;
	if ( vLen == 0 ) {
	} else if ( vLen == 1 ) {
		vStr = gf_nvl(vJson[0].cdnm, "");
		if ( pStep == "2" ) {
			if ( !gf_isEmpty(vJson[0].amt) ) vStr += "(" + $.number(vJson[0].amt) + "만원 정도)";
		}
	} else {
		for ( var i = 0; i < vLen; i++ ) {
			vStr += (i>0?", ":"") + gf_nvl(vJson[i].cdnm, "");
			if ( pStep == "2" ) {
				if ( !gf_isEmpty(vJson[i].amt) ) vStr += "(" + $.number(vJson[i].amt) + "만원 정도)";
			}
		}
		//vStr = "(" + vStr + ")";
	}
	return vStr;
}

function fn_makeMents() {
	var vStep1 = fn_getJsonParam(1);
	var vStep2 = fn_getJsonParam(2);
	var vStep3 = fn_getJsonParam(3);
	var vStep4 = fn_getJsonParam(4);
	var vStep5 = fn_getJsonParam(5);
	var vStep6 = fn_getJsonParam(6);

	/*
	var vMent = "나는 원해요.";
	if ( !gf_isEmpty(vStep1) ) vMent = "나는 " + vStep1;
	if ( !gf_isEmpty(vStep2) ) vMent = "나는 " + Josa(vStep2, "를") + " " + vStep1;
	if ( !gf_isEmpty(vStep3) ) vMent = "나는 " + vStep2 + "로 " + Josa(vStep3, "를") + " " + vStep1;
	if ( !gf_isEmpty(vStep4) ) vMent = "나는 " + vStep2 + "로 " + vStep4 + " 지역의 "+ Josa(vStep3, "를") + " " + vStep1;
	if ( !gf_isEmpty(vStep5) ) vMent = "나는 " + vStep2 + "로 " + vStep4 + " 지역의 "+ vStep5 + "정도의 "+ Josa(vStep3, "를") + " " + vStep1;
	 */

	var vMent = "나는";
	if ( !gf_isEmpty(vStep2) ) vMent += " " + vStep2 + "로";
	if ( !gf_isEmpty(vStep4) ) vMent += " " + vStep4 + " 지역의";
	if ( !gf_isEmpty(vStep3) ) vMent += " " + Josa(vStep3, "를");
	//if ( !gf_isEmpty(vStep5) ) vMent += " " + vStep5 + "정도의";
	vMent += " " + gf_nvl(vStep1, "원해요.");
	
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

