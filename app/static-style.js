(function($){
	$.fn.extraStyle = function(arg, option){
		var target = this.selector;
		$(document).ready(function(){
			extraStyle(target, arg, option);
		});
	}
	function extraStyle(target, arg, option){if(target && arg){
		$(target).each(function(){
			var $target = $(this);
			for(var prop in arg){
				if(funcs[prop]) funcs[prop]($target, arg[prop], option);
				else $target.css(prop, arg[prop]);
			}
		});
	}}
	var funcs = {
		ratio: function($target, value, option){
			setHeight();
			setResize($target, $target, 'width', option);

			$target.on('resize', setHeight);
			if(option !== 'resize') $(window).resize(setHeight);

			function setHeight(){
				$target.outerHeight(getDim($target).width * value);
			}
		},
		fitted: function($target, value, option){ if($target.is('img') && value === 'yes'){
			$target.parent().css('overflow', 'hidden');
			$target.css('width', '100%');
			setResize($target.parent(), $target, 'all', option);

			$target.on('load', fitAndCrop);
			$target.on('resize', fitAndCrop);
			if(option !== 'resize') $(window).resize(fitAndCrop);

			function fitAndCrop(){
				$target.css({ 'width': '', 'height': '', 'margin-left': '', 'margin-top': '' });
				var width = getDim($target).width, height = getDim($target).height;
				var wrapWidth = getDim($target.parent()).width, wrapHeight = getDim($target.parent()).height;
				var ratio = wrapWidth / width;
				if(height * ratio < wrapHeight){
					ratio = wrapHeight / height;
					var nH = height * ratio;
					var nW = width * ratio;
					$target.css({ width: nW, height: nH });
					$target.css({ 'margin-left': (wrapWidth-nW)/2, 'margin-top': 0 });
				} else {
					var nH = height * ratio;
					var nW = width * ratio;
					$target.css({ width: nW, height: nH });
					$target.css({ 'margin-top': (wrapHeight-nH)/2, 'margin-left': 0 });
				}
			}
		}}
	}
	function getDim($obj){
		return $obj[0].getBoundingClientRect();
	}
	function setResize($wrap, $target, mode, option){
		if(option === 'resize' || option === "resize-once"){
			var oldWidth = getDim($wrap).width;
			var intv = setInterval(function(){
				var newWidth = getDim($wrap).width;
				if(oldWidth != newWidth){
					$target.trigger('resize');
					if(option === 'resize-once') clearInterval(intv);
					owidth = newWidth;
				}
			}, 100);
		}
	}
	function compareDim($one, $other, mode){
		var one = getDim($one);
		var other = getDim($other);
		if(mode === 'width'){
			if(one.width == other.width) return true; else false;
		}
		else if(mode === 'height'){
			if(one.height == other.height) return true; else false;
		}
		else {
			if(one.width == other.height && one.height == other.height) return true; else false;
		}
	}
})(jQuery);
