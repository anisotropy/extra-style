(function($){
	$.respStyle('320 500 700 1000');
	$('.first-section').respStyle({
		//'breakpoint': '300 400 600 800',
		'margin': '0 40 0 40 0 40 saw',
		'font-size': '10 - - 60'
		//'float': 'left right none left'
	});
	$('.grid-container').respGrid({
		'breakpoint': '300 400 600 800',
		columns: '1 2 3 4',
		ratio: '0.2 0.3 2 1',
		//ratio: 'auto',
		gutter: '10 - - 30',
		cell3: '1 = 2 1',
		cell4: '1 2 1 4'
	}, 'computed');

	$(window).trigger('es-setScrollbarEvent');

})(jQuery);
