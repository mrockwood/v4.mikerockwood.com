/* ==========================================================================
   #MAIN
   ========================================================================== */




/**
 * JS has loaded
 */

console.log('main.js loaded!');




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




/**
 * Load Disqus comments on button click
 * https://gist.github.com/nternetinspired/7482445
 */
/*
$(document).ready(function() {
	$('.js-load-comments').on('click', function(){
		var disqus_shortname = 'mikerockwood'; // Replace this value with *your* username.

		// ajax request to load the disqus javascript
		$.ajax({
			type: "GET",
			url: "https://" + disqus_shortname + ".disqus.com/embed.js",
			dataType: "script",
			cache: true
		});

		// hide the button once comments load
		$(this).fadeOut();
	});
});
*/
