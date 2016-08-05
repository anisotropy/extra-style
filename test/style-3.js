(function($){
	$('.container').respGrid({
		columns: '1 2 3 4',
		ratio: 'auto',
		gutter: '10 - - 40'
	});
	$('.container2').respGrid({
		columns: '1 3 3 4',
		ratio: '2 0.5 0.2 0.2',
		gutter: '10 20 30 40 step',
		cell0: '1 1 1 2'
	});
	$('.cell0').respGrid({
		columns: '2 = = =',
		ratio: 'inherited',
		gutter: '10 15 20 30 step'
	});
	$('.cell2').respGrid({
		columns: '1 = = =',
		ratio: 'inherited',
		gutter: '10 15 20 30 step'
	});
	
	$('.grid-container').respGrid({
		breakpoint: '300 400 600 800',
		columns: '1 2 3 4',
		ratio: '0.2 0.5 0.5 0.5',
		gutter: '10 - - 30',
		cell3: '1 = 2 1',
		cell4: '1 2 1 4'
	}, 'computed');
})(jQuery);
