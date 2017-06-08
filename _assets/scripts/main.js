
/**
 * Load svg4everybody
 */

svg4everybody();




/**
 * Zoom image on click
 */

$(document).ready(function() {
	$('.js-zoom').click(function() {
		$(this).toggleClass('c-zoom?full-size');
	});
});
