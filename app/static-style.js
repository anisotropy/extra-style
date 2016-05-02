(function($){
	$.fn.extraStyle = function(arg){
		var target = this.selector;
		$(document).ready(function(){
			$(target).each(function(){
				for(var prop in arg){
					if(funcs[prop]) funcs[prop]($(this), arg[prop]);
					else $(this).css(prop, arg[prop]);
				}
			});
		});
	}
	var funcs = {
		ratio: function($target, value){
			$target.outerHeight(getDim($target).width * value);
			$(window).resize(function(){
				$target.outerHeight(getDim($target).width * value);
			});
		},
		fitted: function($target, value){
			if(!$target.is('img') || value != 'yes') return;
			$target.parent().css('overflow', 'hidden');
			$target.css('width', '100%');
			$(window).resize(function(){
				$target.css({ 'width': '', 'height': '', 'margin-left': '', 'margin-top': '' });
				fitAndCrop($target);
			});
			if($target.width() && $target.height()) fitAndCrop($target);
			else $target.on('load', function(){ fitAndCrop($target); });

			function fitAndCrop($image){
				var width = $image.width();
				var height = $image.height();
				var wrapWidth = $image.parent().width();
				var wrapHeight = $image.parent().height();
				var ratio = wrapWidth / width;
				if(height * ratio < wrapHeight){
					ratio = wrapHeight / height;
					var nH = height * ratio;
					var nW = width * ratio;
					$image.css({ width: nW, height: nH });
					$image.css({ 'margin-left': (wrapWidth-nW)/2, 'margin-top': 0 });
				} else {
					var nH = height * ratio;
					var nW = width * ratio;
					$image.css({ width: nW, height: nH });
					$image.css({ 'margin-top': (wrapHeight-nH)/2, 'margin-left': 0 });
				}
			}
		}//fittted
	}
	function getDim($obj){
		return $obj[0].getBoundingClientRect();
	}
})(jQuery);
