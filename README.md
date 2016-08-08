# extra-style
css로 구현할 수 없는 스타일을 자바 스크립트로 구현.

### 시스템
* Dependency: jQuery
* install: npm install
* Development: npm start
* Build: npm run build

### .extarStyle(styleObject [, option] [, getDimFuncs])
1. styleObject
	* 형식
		* ```ratio: 높이/폭```
		* ```fitted: [outer, inner, auto]```
1. option: wait, resize, resize-once
1. getDimFuncs: clientrect, outerrect, computed

### $.resyStyle(breakpoint)
1. breakpoint
	* 형식: ```'공백으로 구분되는 값'```
	* Global breakpoints

### .respStyle(styleObject)
1. styleObject
	* 형식
		* ```breakpoint: '공백으로 구분되는 값'```
		* ```값이-하나의-숫자인-css-속성: '공백으로-구분되는-값 [-] [=] [단위] [conti] [함수]'```
		* ```값이-숫자가-아닌-속성: '공백으로-구분되는-값 [-] [=]'```
	* 설명
		* breakpoint: Local breakpoints
		* 값이 하나의 숫자인 css 속성: font-size, padding-left 등
		* 값이 숫자가 아닌 속성:
			* 속성: float, position, overflow, overflow-x, overflow-y, display
			* 값: left, right, none, absolute, fixed, static, hidden, scroll, auto, inherited, none, block, inline, inline-block
		* -
			* 중간값
		* =
			* 앞의 값과 동일한 값
		* 단위
			* px(default), em, ex, %, cm, mm, in, pt, pc, ch, rem, vh, vw, vmin, vmax
		* 함수
			* linear(default), step, saw

### .respGrid(styleObject [, getDimFuncs])
1. styleObject
	* 형식
		* ```breakpoint: '공백으로 구분되는 값'```
		* ```columns: '공백으로-구분되는-값 [-] [=]'```
		* ```ratio: '공백으로-구분되는-값 [-] [=]'```
		* ```gutter: '공백으로-구분되는-값 [-] [=] [단위] [conti] [함수]'```
		* ```cell인덱스: '공백으로 구분되는 값'```
