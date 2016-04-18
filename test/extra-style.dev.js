/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\n(function ($) {\n\t$.fn.extraStyle = function (arg) {\n\t\tvar target = this.selector;\n\t\t$(document).ready(function () {\n\t\t\t$(target).each(function () {\n\t\t\t\tfor (var prop in arg) {\n\t\t\t\t\tif (funcs[prop]) funcs[prop]($(this), arg[prop]);else $(this).css(prop, arg[prop]);\n\t\t\t\t}\n\t\t\t});\n\t\t});\n\t};\n\tvar funcs = {\n\t\tratio: function ratio($target, value) {\n\t\t\t$target.outerHeight(getDim($target).width * value);\n\t\t\t$(window).resize(function () {\n\t\t\t\t$target.outerHeight(getDim($target).width * value);\n\t\t\t});\n\t\t}\n\t};\n\tfunction getDim($obj) {\n\t\treturn $obj[0].getBoundingClientRect();\n\t}\n})(jQuery);//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXh0cmEtc3R5bGUuanM/ZWQ0YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsVUFBUyxDQUFULEVBQVc7QUFDWCxHQUFFLEVBQUYsQ0FBSyxVQUFMLEdBQWtCLFVBQVMsR0FBVCxFQUFhO0FBQzlCLE1BQUksU0FBUyxLQUFLLFFBQUwsQ0FEaUI7QUFFOUIsSUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFVO0FBQzNCLEtBQUUsTUFBRixFQUFVLElBQVYsQ0FBZSxZQUFVO0FBQ3hCLFNBQUksSUFBSSxJQUFKLElBQVksR0FBaEIsRUFBb0I7QUFDbkIsU0FBRyxNQUFNLElBQU4sQ0FBSCxFQUFnQixNQUFNLElBQU4sRUFBWSxFQUFFLElBQUYsQ0FBWixFQUFxQixJQUFJLElBQUosQ0FBckIsRUFBaEIsS0FDSyxFQUFFLElBQUYsRUFBUSxHQUFSLENBQVksSUFBWixFQUFrQixJQUFJLElBQUosQ0FBbEIsRUFETDtLQUREO0lBRGMsQ0FBZixDQUQyQjtHQUFWLENBQWxCLENBRjhCO0VBQWIsQ0FEUDtBQVlYLEtBQUksUUFBUTtBQUNYLFNBQU8sZUFBUyxPQUFULEVBQWtCLEtBQWxCLEVBQXdCO0FBQzlCLFdBQVEsV0FBUixDQUFvQixPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FBd0IsS0FBeEIsQ0FBcEIsQ0FEOEI7QUFFOUIsS0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFVO0FBQzFCLFlBQVEsV0FBUixDQUFvQixPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FBd0IsS0FBeEIsQ0FBcEIsQ0FEMEI7SUFBVixDQUFqQixDQUY4QjtHQUF4QjtFQURKLENBWk87QUFvQlgsVUFBUyxNQUFULENBQWdCLElBQWhCLEVBQXFCO0FBQ3BCLFNBQU8sS0FBSyxDQUFMLEVBQVEscUJBQVIsRUFBUCxDQURvQjtFQUFyQjtDQXBCQSxDQUFELENBdUJHLE1BdkJIIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCl7XG5cdCQuZm4uZXh0cmFTdHlsZSA9IGZ1bmN0aW9uKGFyZyl7XG5cdFx0dmFyIHRhcmdldCA9IHRoaXMuc2VsZWN0b3I7XG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRcdCQodGFyZ2V0KS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGZvcih2YXIgcHJvcCBpbiBhcmcpe1xuXHRcdFx0XHRcdGlmKGZ1bmNzW3Byb3BdKSBmdW5jc1twcm9wXSgkKHRoaXMpLCBhcmdbcHJvcF0pO1xuXHRcdFx0XHRcdGVsc2UgJCh0aGlzKS5jc3MocHJvcCwgYXJnW3Byb3BdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblx0dmFyIGZ1bmNzID0ge1xuXHRcdHJhdGlvOiBmdW5jdGlvbigkdGFyZ2V0LCB2YWx1ZSl7XG5cdFx0XHQkdGFyZ2V0Lm91dGVySGVpZ2h0KGdldERpbSgkdGFyZ2V0KS53aWR0aCAqIHZhbHVlKTtcblx0XHRcdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcblx0XHRcdFx0JHRhcmdldC5vdXRlckhlaWdodChnZXREaW0oJHRhcmdldCkud2lkdGggKiB2YWx1ZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gZ2V0RGltKCRvYmope1xuXHRcdHJldHVybiAkb2JqWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHR9XG59KShqUXVlcnkpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hcHAvZXh0cmEtc3R5bGUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);