(function($){
	$('.box').extraStyle({
		ratio: 0.6
	}, 'resize', 'outerrect');

	$('.image-wrapper > img').extraStyle({
		fitted: 'auto' //outer, inner, center, auto
	});
})(jQuery);
