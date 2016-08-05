(function($){
	$.fn.extraStyle = function(arg, option, getDimOption){ if(arg){
		if(getDimOption === undefined) getDimOption = 'clientrect';
		return this.each(function(){
			new ExtraStyle($(this), arg, option, getDimOption);
		});
	}}
	function ExtraStyle($target, arg, option, getDimOption){
		for(var prop in arg){
			switch(prop){
				case 'ratio':
					ratio($target, arg[prop], option, getDimFuncs[getDimOption])
					break;
				case 'fitted':
					fitted($target, arg[prop], option, getDimFuncs[getDimOption]);
					break;
				default:
					$target.css(prop, arg[prop]);
			}
		}
	}
	function ratio($target, value, option, getDim){
		setResize($target, $target, 'width', option, getDim);
		if(option !== 'wait') setHeight();
		$target.on('resize', setHeight);
		$target.on('refresh', setHeight);
		if(option !== 'resize') $(window).resize(setHeight);

		function setHeight(){ if($target.is(':visible')){
			$target.outerHeight(getDim($target).width * value);
		}}
	}
	function fitted($target, value, option, getDim){ if($target.is('img')){
		$target.parent().css({
			'overflow': 'hidden', 'position': 'relative'
		});
		$target.css({
			position: 'absolute',
			top: '50%', left: '50%',
			transform: 'translate(-50%, -50%)'
		});
		if(value != 'center'){
			setResize($target.parent(), $target, 'all', option, getDim);
			if(option !== 'wait') $target.on('load', fitAndCrop);
			$target.on('resize', fitAndCrop);
			$target.on('refresh', fitAndCrop);
			if(option !== 'resize') $(window).resize(fitAndCrop);
		}
		function fitAndCrop(){ if($target.is(':visible')){
			$target.css({ 'width': '', 'height': '' });
			var dim = getDim($target), parDim = getDim($target.parent());
			var ratio = dim.height*parDim.width/(dim.width*parDim.height);
			if(value == 'auto'){
				if(dim.width <= parDim.width && dim.height <= parDim.height){
					ratio = 0;
				}
			} else {
				if(value == 'inner') ratio = 1 / ratio;
			}
			if(0 < ratio && ratio < 1){
				$target.css('height', '100%');
			} else if(ratio > 1) {
				$target.css('width', '100%');
			}
		}}
	}}
	var getDimFuncs = {
		clientrect: function($obj){
			return $obj[0].getBoundingClientRect();
		},
		outerrect: function($obj){
			return { width: $obj.outerWidth(), height: $obj.outerHeight() }
		},
		computed: function($obj){
			var computedStyle = window.getComputedStyle($obj[0]);
			return { width: parseFloat(computedStyle.width), height: parseFloat(computedStyle.height) };
		}
	}
	function setResize($wrap, $target, mode, option, getDim){
		if(option === 'resize' || option === "resize-once"){
			var oldDim = getDim($wrap);
			var intv = setInterval(function(){
				var newDim = getDim($wrap);
				if(compareDim(oldDim, newDim, mode) === false){
					$target.trigger('resize');
					if(option === 'resize-once') clearInterval(intv);
					oldDim = newDim;
				}
			}, 100);
		}
	}
	function compareDim(one, other, mode){
		if(mode === 'width'){
			if(one.width == other.width) return true; else return false;
		}
		else if(mode === 'height'){
			if(one.height == other.height) return true; else return false;
		}
		else {
			if(one.width == other.height && one.height == other.height) return true; else return false;
		}
	}
})(jQuery);
