
/**
 * Load Disqus comments on button click
 */

$(document).ready(function() {
	$('.js-load-comments').on('click', function(){
		var disqus_shortname = 'YOUR-DISQUS-USERNAME'; // Replace this value with *your* username.

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
