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
			var owidth = getDim($target).width;
			$target.outerHeight(owidth * value);
			$target.on('resize', function(){
				var intv = setInterval(function(){
					if(owidth != getDim($target).width){
						$target.outerHeight(getDim($target).width * value);
						clearInterval(intv);
					}
				}, 300);
			});
			$(window).resize(function(){
				$target.outerHeight(getDim($target).width * value);
			});
		},
		fitted: function($target, value){
			if(!$target.is('img') || value != 'yes') return;
			$target.parent().css('overflow', 'hidden');
			$target.css('width', '100%');
			var owidth = getDim($target).width;
			$target.on('load', function(){ fitAndCrop($target); });
			$(window).resize(function(){
				$target.css({ 'width': '', 'height': '', 'margin-left': '', 'margin-top': '' });
				fitAndCrop($target);
			});
			$target.on('resize', function(){
				var intv = setInterval(function(){
					if(owidth != getDim($target).width){
						$target.css({ 'width': '', 'height': '', 'margin-left': '', 'margin-top': '' });
						fitAndCrop($target);
						clearInterval(intv);
					}
				}, 300);
			});

			function fitAndCrop($image){
				var width = getDim($image).width;
				var height = getDim($image).height;
				var wrapWidth = getDim($image.parent()).width;
				var wrapHeight = getDim($image.parent()).height;
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
