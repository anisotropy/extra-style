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
		}
	}
	function getDim($obj){
		return $obj[0].getBoundingClientRect();
	}
})(jQuery);
