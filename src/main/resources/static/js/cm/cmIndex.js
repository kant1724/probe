$(document).ready(function() {
	$( "#div100" ).load( "cmMain" );
	
	$(document).on("keyup", "input:text[numberOnly]", function() {
		$(this).number(true);
	});
});
