$(document).ready(function() {
	$('#apply').click(function() {
		goApply();
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
        	alert(data);
        },
        error: function (jqXhr, textStatus, errorMessage) {
        	alert(errorMessage)
        	if(jqXhr.status==404) {
            }
        }
    });
}

function goApply() {
	$(location).attr('href', '/partnerStepOne')
}
