(function($){
	$.respStyle('320 500 700 1000');
	$('.first-section').respStyle({
		'breakpoint': '300 400 600 800',
		//'margin': '0 40 0 40 0 40 saw'
		'font-size': '10 - - 60'
		//'float': 'left right none left'
	});

	$('.grid-container').respGrid({
		'breakpoint': '300 400 600 800',
		columns: '1 3 3 4',
		ratio: '0.5 1 2 2',
		//ratio: 'auto',
		gutter: '10 15 20 30',
		cell3: '1 1 1 2'
	});


})(jQuery);
