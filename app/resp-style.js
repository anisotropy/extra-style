(function($){
	var _bp = [320, 768, 1024, 1280];

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
	$.respStyle = function(arg){if(arg){
		var array = arg.split(' ');
		if(array.length < 2){ console.error('Error: the length of break points'); return false; }
		_bp = [];
		for(var i = 0, len = array.length; i < len; i++){
			if($.isNumeric(array[i])) _bp.push(parseFloat(array[i]));
		}
	}}
	$.fn.respStyle = function(arg){
		var target = this.selector;
		$(document).ready(function(){
			$(target).each(function(){
				var $target = $(this);
				var style = new Style(arg);
				$target.css(style.css());
				$(window).resize(function(){
					$target.css(style.css());
				});
			});
		});
	}
	$.fn.respGrid = function(arg){
		var target = this.selector;
		$(document).ready(function(){
			$(target).each(function(){
				$(this).css('overflow', 'hidden');
				$(this).children('div').addClass('es').addClass('es-cell').css({float: 'left', overflow: 'hidden'});
				if($(this).is('.es.es-cell')) $(this).addClass('es-nested');
				var $target = $(this);
				var grid = new Grid(arg, $target.children('.es.es-cell').length);
				/*
				var curGData = calcGrid(gridData);
				adjustCell($target, curGData);
				$(window).on('completeResize', function(){
					curGData = calcGrid(gridData);
					adjustCell($target, curGData);
				});
				$(window).on('changeScrollbar', function(){
					adjustWidth($target, curGData);
				});
				*/
			});
		});
	}

	// style ////
	function Style(arg){
		var this_data = {};
		var this_lbp = [];
		var this_style = {};
		this.css = function(calc){
			if(calc === undefined || calc) this.calcStyle(this_data, this_lbp, this_style);
			return this_style;
		}
		//initialize ////
		if(arg){
			this.convToObj(arg, this_data, this_lbp);
			this.validate(this_data, this_lbp);
			this.calcEqual(this_data);
			this.calcMiddle(this_data, this_lbp);
		}
	}
	Style.prototype.convToObj = function(arg, data, lbp){
		for(var prop in arg){
			if(prop !== 'breakpoint'){
				data[prop] = { series: [], max: false, unit: 'px', func: 'linear'};
				this.convToObjEach(arg[prop], data[prop]);
			} else {
				this.convToObjEach(arg[prop], lbp);
			}
		}
	}
	Style.prototype.convToObjEach = function(propOfArg, propOfData){
		var array = propOfArg.split(' ');
		if(array.length < 1){ console.error('Error: the length of argument'); return false; }
		if($.type(propOfData) === 'object'){
			for(var i = 0, len = array.length; i < len; i++){
				if($.isNumeric(array[i])) propOfData.series.push(parseFloat(array[i]));
				else if(array[i] === '-' || array[i] === '=') propOfData.series.push(array[i]);
				else if(this.isNotNumVal(array[i])) propOfData.series.push(array[i]);
				else if(this.isUnit(array[i])) propOfData.unit = array[i];
				else if(array[i] === 'max') propOfData.max = true;
				else if(array[i] === 'linear' || array[i] === 'step' || array[i] === 'saw') propOfData.func = array[i];
			}
		} else if($.type(propOfData) === 'array'){
			for(var i = 0, len = array.length; i < len; i++){
				if($.isNumeric(array[i])) propOfData.push(parseFloat(array[i]));
				else if(array[i] === '-' || array[i] === '=') propOfData.push(array[i]);
				else if(this.isNotNumVal(array[i])) propOfData.push(array[i]);
			}
		}
	}
	Style.prototype.validate = function(data, lbp){
		var bpLength;
		if(lbp.length == 0) bpLength = _bp.length; else bpLength =  lbp.length;
		for(var prop in data){
			if($.type(data[prop]) === 'object'){
				if(data[prop].func !== 'saw' && data[prop].series.length < bpLength){
					for(var i = data[prop].series.length, len = bpLength; i < len; i++){
						data[prop].series[i] = data[prop].series[i-1];
					}
				}
				else if(data[prop].func === 'saw' && data[prop].series.length <bpLength*2){
					for(var i = data[prop].series.length, len = bpLength*2; i < len; i++){
						data[prop].series[i] = data[prop].series[i-1];
					}
				}
			} else if($.type(data[prop]) === 'array'){
				if(data[prop].length < bpLength){
					for(var i = data[prop].length, len = bpLength; i < len; i++){
						data[prop][i] = data[prop][i-1];
					}
				}
			}
		}
	}
	Style.prototype.calcMiddle = function(data, lbp){
		var bp; if(lbp.length == 0) bp = _bp; else bp = lbp;
		for(var prop in data){
			var series;
			if($.type(data[prop]) === 'object') series = data[prop].series;
			else if($.type(data[prop]) === 'array') series = data[prop];
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
							console.error('Wrong usage of "-"'); return;
						}
					}
					series[i] = (series[nni] - series[pni]) * (bp[i] - bp[pni]) / (bp[nni] - bp[pni]) + series[pni];
				}
			}
		}
	}
	Style.prototype.calcEqual = function(data){
		for(var prop in data){
			var series;
			if($.type(data[prop]) === 'object') series = data[prop].series;
			if(series[0] === '='){ console.error('Wrong usage of "="'); return; }
			for(var i = 1, len = series.length; i < len; i++){
				if(series[i] === '=') series[i] = series[i-1];
			}
		}
	}
	Style.prototype.calcStyle = function(data, lbp, style){
		var sbp = {};
		sbp.ww = window.innerWidth;
		if(lbp.length == 0) sbp.bp = _bp; else sbp.bp = lbp;
		if(sbp.ww < sbp.bp[0]) sbp.bpi = -1;
		else if(sbp.ww >=  sbp.bp[sbp.bp.length-1]) sbp.bpi = -2;
		else { for(var i = 0; i < sbp.bp.length-1; i++){
			if(sbp.bp[i] <= sbp.ww && sbp.ww < sbp.bp[i+1]){ sbp.bpi = i; break; }
		}}

		for(var prop in data){
			if(!this.isNotNumProp(prop)){
				style[prop] = this.calc(data[prop].series, data[prop].max, data[prop].func, sbp) + data[prop].unit;
			} else {
				style[prop] = this.pick(data[prop].series, sbp);
			}
		}
	}
	Style.prototype.pick = function(series, sbp){
		if(sbp.bpi >= 0) return series[sbp.bpi];
		else if(sbp.bpi == -1) return series[0];
		else if(sbp.bpi == -2) return series[sbp.bp.length-1];
	}
	Style.prototype.calc = function(series, max, func, sbp){
		var bp = sbp.bp;
		var bpi = sbp.bpi;
		var len = sbp.bp.length;
		var ww = sbp.ww;

		var i;
		if(bpi >= 0){
			i = bpi;
		} else if(bpi === -1){
			return series[0];
		} else if(bpi === -2){
			if(max){
				if(func !== 'saw') return series[len-1];
				else if(func === 'saw') return series[2*(len-1)+1];
			} else {
				if(func === 'linear' || func === 'saw'){ i = len-2; }
				else if(func === 'step') i = len - 1;
			}
		}

		if(func === 'step'){
			return series[i];
		} else if(func === 'linear'){
			if(bpi >= 0)
				return (series[i+1] - series[i]) * (ww - bp[i]) / (bp[i+1] - bp[i]) + series[i];
			else
				return (series[i+1] - series[i]) * (ww - bp[i+1]) / (bp[i+1] - bp[i]) + series[i+1];
		} else if(func === 'saw'){
			if(bpi >= 0)
				return (series[i*2+1] - series[i*2]) * (ww - bp[i]) / (bp[i+1] - bp[i]) + series[i*2];
			else
				return (series[i*2+3] - series[i*2+2]) * (ww - bp[i]) / (bp[i+1] - bp[i]) + series[i*2+2];
		}
	}
	Style.prototype.isUnit = function(unit){
		var units = ['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'];
		if($.inArray(unit, units) > -1) return true; else return false;
	}
	Style.prototype.isNotNumVal = function(value){
		var values = ['left', 'right', 'none', 'absolute', 'fixed', 'static', 'hidden', 'scroll', 'auto',
			'block', 'inline', 'inline-block'];
		if($.inArray(value, values) > -1) return true; else return false;
	}
	Style.prototype.isNotNumProp = function(prop){
		var props = ['float', 'position', 'overflow', 'overflow-x', 'overflow-y', 'display'];
		if($.inArray(prop, props) > -1) return true; else return false;
	}

	// grid ////
	function Grid(arg, numCell){
		var this_data = {
			columns: [], ratio: [],
			gutter: {series: [], max: false, func: 'linear'},
			cells: new Array(numCell)
		};
		var this_grid = {};
		var this_lbp = [];
		//initialize ////
		if(arg){
			this.convToObj(arg, this_data, this_lbp);
			this.postConv(this_data, this_lbp);
		}
	}
	Grid.prototype = new Style();
	Grid.prototype.convToObj = function(arg, data, lbp){
		if(arg.breakpoint) this.convToObjEach(arg.breakpoint, lbp);
		for(var prop in arg){
			if(data[prop]) this.convToObjEach(arg[prop], data[prop]);
			else if(prop.match(/^cell/)){
				var index = parseInt(prop.replace(/^cell/, ''));
				data.cells[index] = [];
				this.convToObjEach(arg[prop], data.cells[index]);
			}

		}
	}
	Grid.prototype.postConv = function(data, lbp){
		/*
		this.validate(data, lbp);
		this.calcEqual(data);
		this.calcMiddle(data, lbp);
		*/
	}
	Grid.prototype.calcGrid = function(data, lbp, grid){
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
	/*
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
	*/
	function getDim($obj){
		return $obj[0].getBoundingClientRect();
	}
})(jQuery);
