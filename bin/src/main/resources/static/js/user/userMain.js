$(document).ready(function() {
	$('.each-component').click(function() {
		searchAddressBySiDoNm($(this).text());
	});

});

function ajax(url, input_data, gubun, method) {
	$.ajax(url, {
		type: method, 
        data: JSON.stringify(input_data),
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        success: function (data, status, xhr) {
        	if (gubun == "searchAddressBySiDoNm") {
            	searchAddressBySiDoNmCallback(data);
			}
        },
        error: function (jqXhr, textStatus, errorMessage) {
        	if(jqXhr.status==404) {
        		alert(textStatus);
            }
        }
    });
}

function searchAddressBySiDoNm(siDoNm) {
	var input_data = {"siDoNm" : siDoNm};
	
	ajax('/userMain/searchAddressBySiDoNm', input_data, 'searchAddressBySiDoNm', 'POST');
}

function searchAddressBySiDoNmCallback(data) {
	alert(data[0]['siGunGuNm']);	
}
