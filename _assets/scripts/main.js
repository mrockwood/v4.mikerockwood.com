/* ==========================================================================
   #MAIN
   ========================================================================== */




/**
 * JS has loaded
 */

console.log('main.js loaded!');




/**
 * Load Web Fonts
 */

WebFontConfig = {
	google: {
		families: ['Merriweather Sans:300,400,600', 'Merriweather:300,400']
	}
};




/**
 * Load svg4everybody
 */

svg4everybody();




/**
 * Load LazyLoad
 */

var myLazyLoad = new LazyLoad();




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
