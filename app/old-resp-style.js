(function($){
	var _bp = [320, 768, 1024, 1280];
	var _bpi, _ww;

	$(window).resize(function(){
		_ww = window.innerWidth;
		_bpi = getBpi();
		$(window).trigger('completeResize');
	});
	$(document).ready(function(){
		var scrollbar = (window.innerWidth != $(window).outerWidth());
		setInterval(function(){
			if(scrollbar && window.innerWidth == $(window).outerWidth()){
				$(window).trigger('changeScrollbar'); scrollbar = false;
			} else if(!scrollbar && window.innerWidth != $(window).outerWidth()){
				$(window).trigger('changeScrollbar'); scrollbar = true;
			}
		}, 100);
	});
	$.respStyle = function(arg){
		var bp = [];
		var array = arg.split(' ');
		if(array.length < 2){ console.error('Error: the length of break points'); return false; }
		for(var i = 0, len = array.length; i < len; i++){
			if($.isNumeric(array[i])) bp.push(parseFloat(array[i]));
		}
		_bp = bp;
	}
	$.fn.respStyle = function(arg){
		init();
		var target = this.selector;
		$(document).ready(function(){
			$(target).each(function(){
				var $target = $(this);
				var styleData = convToObj(arg);
				validate(styleData);
				calcMiddleAndEqual(styleData); console.log(styleData);
				$target.css(calcStyle(styleData));
				$(window).on('completeResize', function(){
					$target.css(calcStyle(styleData));
				});
			});
		});
	}
	$.fn.respGrid = function(arg){
		init();
		var target = this.selector;
		$(document).ready(function(){
			$(target).each(function(){
				$(this).css('overflow', 'hidden');
				$(this).children('div').addClass('es').addClass('es-cell').css({float: 'left', overflow: 'hidden'});
				if($(this).is('.es.es-cell')) $(this).addClass('es-nested');
				var $target = $(this);
				var gridData = convToObjGrid(arg, $target.children('.es.es-cell').length);
				var curGData = calcGrid(gridData);
				adjustCell($target, curGData);
				$(window).on('completeResize', function(){
					curGData = calcGrid(gridData);
					adjustCell($target, curGData);
				});
				$(window).on('changeScrollbar', function(){
					adjustWidth($target, curGData);
				});
			});
		});
	}
	// style ////
	function convToObj(arg){
		var data = {};
		for(var prop in arg){
			var array = arg[prop].split(' ');
			var obj = { series: [], max: false, unit: 'px', func: 'linear'};
			for(var i = 0, len = array.length; i < len; i++){
				if($.isNumeric(array[i])) obj.series.push(parseFloat(array[i]));
				else if(array[i] === '-' || array[i] === '=') obj.series.push(array[i]);
				else if(isNotNumVal(array[i])) obj.series.push(array[i]);
				else if(isUnit(array[i])) obj.unit = array[i];
				else if(array[i] === 'max') obj.max = true;
				else if(array[i] === 'linear' || array[i] === 'step' || array[i] === 'saw') obj.func = array[i];
			}
			data[prop] = obj;
		}
		return data;
	}
	function calcMiddleAndEqual(styleData){
		// '-'은 양 쪽에 대한 중간 값을 의민한다. ////
		for(var prop in styleData){
			var series = styleData[prop].series;
			var pni = 0, nni = 0;
			if(series[0] === '-'){ console.error('Wrong usage of "-"'); return; }
			for(var i = 0, len = series.length; i < len-1; i++){
				if($.isNumeric(series[i])) pni = i;
				if(series[i] === '-'){
					if(nni === 0 || nni < i){
						for(var j = i+1; j < len; j++){
							if($.isNumeric(series[j])){ nni = j; break; }
						}
						if(nni === 0 || nni < i) {
							console.error('Wrong usage of "-"'); return styleData;
						}
					}
					series[i] = (series[nni] - series[pni]) * (_bp[i] - _bp[pni]) / (_bp[nni] - _bp[pni]) + series[pni];
				}
			}
		}

		// '='는 바로 앞의 값과 동일한 값을 의미한다 ////
		for(var prop in styleData){
			var series = styleData[prop].series;
			if(series[0] === '='){ console.error('Wrong usage of "="'); return styleData; }
			for(var i = 1, len = series.length; i < len; i++){
				if(series[i] === '=') series[i] = series[i-1];
			}
			styleData[prop].series = series;
		}
	}
	function calcStyle(styleData) {
		var style = {};
		for(var prop in styleData){
			if(!isNotNumProp(prop)){
				style[prop] = calc(styleData[prop].series, styleData[prop].max, styleData[prop].func) + styleData[prop].unit;
			} else {
				style[prop] = pick(styleData[prop].series);
			}
		}
		return style;
	}
	// grid ////
	function adjustCell($target, curGData){
		var preW = $target.outerWidth();
		var gut = curGData.gutter;
		var cols = curGData.columns;
		var cells = curGData.cells;
		var $cells = $target.children('.es.es-cell');
		var length = $cells.length;
		var cw = (getDim($target).width - gut*(cols-1))/cols;
		var maxCh = 0;
		$cells.css({'margin-right': 0, 'margin-top': 0});
		if(curGData.ratio !== 'auto') $cells.css({width: 0, height: 0});
		else $cells.css({width: 0, height: 0});
		$cells.each(function(index){
			$(this).outerWidth(cw*cells[index] + gut*(cells[index]-1));
			if((index+1) % cols !== 0 && index < length-1) $(this).css({'margin-right': gut});
			if(index >= cols) $(this).css({'margin-top': gut});
			if(curGData.ratio === 'auto'){
				$(this).css({height: ''});
				if(maxCh < getDim($(this)).height) maxCh = getDim($(this)).height;
				if(cols !== 1 && (index+1) % cols === 0){
					for(var i = index - cols + 1; i <= index; i++) $cells.eq(i).outerHeight(maxCh);
					maxCh = 0;
				} else if(cols !== 1 && index === length-1) {
					for(var i = Math.floor((index+1)/cols) * cols; i <= index; i++) $cells.eq(i).outerHeight(maxCh);
				}
			} else {
				var height = cw * curGData.ratio;
				if($target.is('.es.es-nested')) height -= (gut - gut/Math.ceil(length/cols));
				$(this).outerHeight(height);
			}
		});
		if(preW != $target.outerWidth()){
			cw = (getDim($target).width - gut*(cols-1))/cols;
			$cells.each(function(index){ $(this).outerWidth(cw*cells[index] + gut*(cells[index]-1)); });
		}
	}
	function adjustWidth($target, curGData){
		var gut = curGData.gutter;
		var cols = curGData.columns;
		var cells = curGData.cells;
		var $cells = $target.children('.es.es-cell');
		var cw = (getDim($target).width - gut*(cols-1))/cols;
		$cells.each(function(index){
			$(this).outerWidth(cw*cells[index] + gut*(cells[index]-1));
		});
	}
	function convToObjGrid(arg, numCell){
		var gridData = {
			columns: [], ratio: [],
			gutter: {series: [], max: false, func: 'linear'},
			cells: []
		};
		var columns = arg.columns.split(' '); if(columns.length < _bp.length){ console.error('Error: length of columns'); return false; }
		for(var i = 0, len = columns.length; i < len; i++){
			if($.isNumeric(columns[i])) gridData.columns.push(parseInt(columns[i]));
		}
		if(arg.ratio === 'auto'){
			for(var i = 0, len = _bp.length; i < len; i++) gridData.ratio.push('auto');
		} else {
			var ratio = arg.ratio.split(' '); if(ratio.length < _bp.length){ console.error('Error: length of ratio'); return false; }
			for(var i = 0, len = ratio.length; i < len; i++){
				if($.isNumeric(ratio[i])) gridData.ratio.push(parseFloat(ratio[i]));
			}
		}
		var gutter = arg.gutter.split(' ');
		for(var i = 0, len = gutter.length; i < len; i++){
			if($.isNumeric(gutter[i])) gridData.gutter.series.push(parseFloat(gutter[i]));
			else if(isUnit(gutter[i])) gridData.gutter.unit = gutter[i];
			else if(gutter[i] === 'max') gridData.gutter.max = true;
			else if(gutter[i] === 'linear' || gutter[i] === 'step' || gutter[i] === 'saw') gridData.gutter.func = gutter[i];
		}
		if(gridData.gutter.series.length < _bp.length){ console.error('Error: length of gutter'); return false; }
		for(var prop in arg){
			gridData.cells = new Array(numCell);
			if(prop.match(/^cell/)){
				var index = parseInt(prop.replace(/^cell/, ''));
				var values = []; $.each(arg[prop].split(' '), function(index, value){ values.push(parseInt(value)); });
				if(index < numCell) gridData.cells[index] = values;
			}
		}
		return gridData;
	}
	function calcGrid(data){
		var cur = {}, idx;
		if(_bpi >= 0) idx = _bpi;
		else if(_bpi == -1) idx = 0;
		else if(_bpi == -2) idx = _bp.length-1;
		cur.columns = data.columns[idx];
		cur.ratio = data.ratio[idx];
		cur.gutter = calc(data.gutter.series, data.gutter.max, data.gutter.func);
		cur.cells = [];
		for(var i = 0, len = data.cells.length; i < len; i++){
			 if(data.cells[i]) cur.cells[i] = data.cells[i][idx];
			 else cur.cells[i] = 1;
		}
		return cur;
	}
	// common ////
	function validate(data){
		for(var prop in data){
			if(data[prop].func !== 'saw' && data[prop].series.length < _bp.length){
				for(var i = data[prop].series.length, len = _bp.length; i < len; i++){
					data[prop].series[i] = data[prop].series[i-1];
				}
			}
			else if(data[prop].func === 'saw' && data[prop].series.length < _bp.length*2){
				for(var i = data[prop].series.length, len = _bp.length*2; i < len; i++){
					data[prop].series[i] = data[prop].series[i-1];
				}
			}
		}
		return data;
	}
	function isUnit(value){
		var units = ['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'];
		for(var i = 0, len = units.length; i < len; i++){
			if(value == units[i]) return true;
		}
		return false;
	}
	function isNotNumVal(value){
		var values = [
			'left', 'right', 'none', 'absolute', 'fixed', 'static', 'hidden', 'scroll', 'auto', 'block', 'inline', 'inline-block'
		];
		if($.inArray(value, values) > -1) return true;
		else return false;
	}
	function isNotNumProp(prop){
		var props = ['float', 'position', 'overflow', 'overflow-x', 'overflow-y', 'display'];
		if($.inArray(prop, props) > -1) return true;
		else return false;
	}
	function pick(series){
		if(_bpi >= 0) return series[_bpi];
		else if(_bpi == -1) return series[0];
		else if(_bpi == -2) return series[_bp.length-1];
	}
	function calc(series, max, func){
		var i, j;
		if(_bpi >= 0){
			i = _bpi; j = _bpi + 1;
		} else if(_bpi == -2){
			if(max && func !== 'saw') return series[_bp.length-1];
			else if(max && func === 'saw') return series[2*(_bp.length-1)+1];
			if(func === 'linear' || func === 'saw'){ i = _bp.length - 2; j = _bp.length - 1; }
			else if(func === 'step') i = _bp.length - 1;
		} else if(_bpi == -1){
			return series[0];
		}
		if(func === 'step'){
			return series[i];
		} else if(func === 'linear'){
			return (series[j] - series[i]) * (_ww - _bp[i]) / (_bp[j] - _bp[i]) + series[i];
		} else if(func === 'saw'){
			var m = i * 2;
			var n = m + 1;
			return (series[n] - series[m]) * (_ww - _bp[i]) / (_bp[j] - _bp[i]) + series[m];
		}
	}
	function getBpi(){
		var len = _bp.length;
		if(_ww < _bp[0]) return -1;
		else if(_ww >= _bp[len-1]) return -2;
		else {
			for(var i = 0; i < len-1; i++){
				if(_bp[i] <= _ww && _ww < _bp[i+1]) return i;
			}
		}
	}
	function init(){
		if(!_ww) _ww = window.innerWidth;
		if(!_bpi) _bpi = getBpi();
	}
	function getDim($obj){
		return $obj[0].getBoundingClientRect();
	}
})(jQuery);
