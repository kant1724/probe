$(document).ready(function() {

	var vDealKey = $("#dealKey").val();
	log(vDealKey);
	//1. if vDealKey이 없을때 뒤로가기 만들것. ks20181118
	//2. 리스트업 됐을때 후행연결 만들것.

	var input_data = { "dealKey" : vDealKey };
	var option = { url:"/dlResultList"
		         , data: input_data
		         , success: function (data, status, xhr) {fn_resultCallback(data, status, xhr);}
				 };
	gf_ajax(option);
});


function fn_resultCallback(data, status, xhr) {
	// 자료로 리스트업
	console.log(data);
	var k = data.length;
	if ( k == 0 ) { // 없을때
		var vResult = Mustache.render($("#dlResultEmptyTemplate").html());
		$("#dlResultMain").html(vResult);
		return;
	} else {
		var vResult = Mustache.render($("#dlResultTemplate").html(), data);
		$("#dlResultMain").html(vResult);
	}
}