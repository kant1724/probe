$(document).ready(function() {
	$('#btnJoin').click(function() {
		
		$.ajax({
			url:"/userMain/searchAddressBySiDoNm",
			type: "POST", 
	        data: JSON.stringify({"siDoNm" : "경기도"}),
	        async: false,
	        contentType: 'application/json',
	        dataType: 'json',
	        processData: false,
	        success: function (data, status, xhr) {
	        	console.log(data);
	        	console.log(status);
	        	console.log(xhr);
	        },
	        error: function (jqXhr, textStatus, errorMessage) {
	        	if(jqXhr.status==404) {
	        		alert(textStatus);
	            }
	        }
	    });

	});

});


