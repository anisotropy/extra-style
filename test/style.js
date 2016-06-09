$('.box').extraStyle({
	ratio: 0.6
}, 'resize');

$('.image-wrapper > img').extraStyle({
	fitted: 'yes'
});

$.respStyle('320 768 1024 1280');

$('.first-section, .second-section').respStyle({
	'font-size': '16 30 50 70', // linear px
	'margin': '0 50 0 60 0 70 0 80 saw max'
});
$('.third-section img').respStyle({
	'float': 'left right left right'
})

$('.container').respGrid({
	columns: '1 2 3 4',
	ratio: 'auto',
	//ratio: '0.5 0.5 1 1',
	gutter: '10 15 20 30 step'
});
$('.container2').respGrid({
	columns: '1 3 3 4',
	ratio: '0.5 1 2 2',
	gutter: '10 15 20 30 step',
	cell0: '1 1 1 2'
});
$('.cell0').respGrid({
	columns: '2 2 2 2',
	ratio: '0.25 1 2 2',
	gutter: '10 15 20 30 step'
});
$('.cell2').respGrid({
	columns: '1 1 1 1',
	ratio: '0.25 0.5 1 1',
	gutter: '10 15 20 30 step'
});
