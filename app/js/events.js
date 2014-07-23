$(function(){
	$('#scan-btn').on('click', function(e){
		e.preventDefault();
		scanDisk();
	});
});