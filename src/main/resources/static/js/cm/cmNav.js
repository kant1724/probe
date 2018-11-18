
$( document ).ready(function() {
    //$('.leftmenutrigger').on('click', function(e) {
    //$('.side-nav').toggleClass("open");
    //e.preventDefault();
   //});
});


$(".navbar-brand").click(function(){
	goPage("cmWelcome");
});


$("#ptIncome").click(function(){
	goPage("partnerMain");
});

$("#cmHome").click(function(){
	goPage("cmWelcome");
});

$("#cmHowto").click(function(){
	goPage("dlResult?dealKey=34");
});

$("#dlMain_9").click(function(){
	goPage("dlMain?meth=9");
});

$("#dlMain_8").click(function(){
	goPage("dlMain?meth=8");
});