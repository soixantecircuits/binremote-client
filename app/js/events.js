$(function(){
	$('#scan-btn').on('click', function(e){
		e.preventDefault();
		var btn = $('#scan-btn');
		if(!btn.hasClass('scanning')){
			scanDisk();
		} else {
			emitter.end();
		}
		btn.toggleClass('scanning');
	});
});