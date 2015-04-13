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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _Fraction = __webpack_require__(1);

	var _Fraction2 = _interopRequireWildcard(_Fraction);

	if (window) window.Fraction = _Fraction2['default'];
	exports['default'] = _Fraction2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var Fraction = (function () {
	    function Fraction(molecular, denominator, isNegative) {
	        _classCallCheck(this, Fraction);

	        this.molecular = Math.abs(molecular);
	        this.denominator = Math.abs(denominator);
	        this.isNegative = molecular < 0 ^ denominator < 0 ^ isNegative;

	        var g = gcd(this.molecular, this.denominator);
	        this.molecular /= g;
	        this.denominator /= g;
	    }

	    _createClass(Fraction, [{
	        key: 'isNegative',
	        get: function () {
	            return this._isNegative;
	        },
	        set: function (value) {
	            this._isNegative = !!value;
	        }
	    }, {
	        key: 'molecular',
	        get: function () {
	            return this._molecular;
	        },
	        set: function (value) {
	            if (!isNumber(value) || value < 0) {
	                throw TypeError('invalid molecular');
	            }
	            this._molecular = value;
	        }
	    }, {
	        key: 'denominator',
	        get: function () {
	            return this._denominator;
	        },
	        set: function (value) {
	            if (!isNumber(value) || value <= 0) {
	                throw TypeError('invalid denominator');
	            }
	            this._denominator = value;
	        }
	    }, {
	        key: 'plus',
	        value: function plus(fraction) {
	            if (!fraction instanceof Fraction) {
	                throw TypeError('wrong type');
	            }

	            var denominator = lcm(fraction.denominator, this.denominator);
	            var molecular = denominator / this.denominator * this.molecular * (this.isNegative ? -1 : 1) + denominator / fraction.denominator * fraction.molecular * (fraction.isNegative ? -1 : 1);

	            var g = gcd(Math.abs(molecular), denominator);
	            return new Fraction(Math.abs(molecular / g), denominator / g, molecular < 0);
	        }
	    }, {
	        key: 'minus',
	        value: function minus(fraction) {
	            return this.plus(new Fraction(fraction.molecular, fraction.denominator, !fraction.isNegative));
	        }
	    }, {
	        key: 'times',
	        value: function times(fraction) {
	            var isNegative = !!(fraction.isNegative ^ this.isNegative);
	            var molecular = fraction.molecular * this.molecular;
	            var denominator = fraction.denominator * this.denominator;

	            var g = gcd(Math.abs(molecular), Math.abs(denominator));
	            return new Fraction(molecular / g, denominator / g, isNegative);
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this.isNegative + ' ' + this.molecular + '/' + this.denominator;
	        }
	    }, {
	        key: 'toNumber',
	        value: function toNumber() {
	            return (this.isNegative ? -1 : 1) * this.molecular / this.denominator;
	        }
	    }], [{
	        key: 'fromInterger',
	        value: function fromInterger(value) {
	            if (!isNumber(value) || value !== Math.floor(value)) {
	                throw TypeError('invalide integer');
	            }
	            return new Fraction(value, 1);
	        }
	    }, {
	        key: 'fromFloat',
	        value: function fromFloat(value, precision) {
	            if (!isNumber(value)) {
	                throw TypeError('invalide float');
	            }

	            if (!precision) {
	                precision = 4;
	            }
	            if (!isNumber(precision) || precision < 0 || precision !== Math.round(precision)) {
	                throw new TypeError('invalide precision');
	            }

	            var denominator = Math.pow(10, precision);
	            var molecular = Math.round(value * denominator);
	            var isNegative = molecular < 0;

	            var g = gcd(denominator, Math.abs(molecular));
	            return new Fraction(molecular / g, denominator / g);
	        }
	    }]);

	    return Fraction;
	})();

	function isNumber(value) {
	    return Object.prototype.toString.call(value) === '[object Number]';
	}

	/**
	 * 最大公约数
	 *  function gcd(a, b) {
	 *      if(b == 0) return a;
	 *      return gcd(b, a % b);
	 *  }
	 */
	function gcd(a, b) {
	    if (isNaN(a) || isNaN(b)) {
	        throw new Error('number overflow');
	    }
	    while (b !== 0) {
	        var r = b;
	        b = a % b;
	        a = r;
	    }
	    return a;
	}

	// 最小公倍数
	function lcm(a, b) {
	    var min = Math.min(a, b);
	    var max = Math.max(a, b);

	    for (var i = 1, v; v = i * max, v <= min * max; i++) {
	        if (v % min === 0) {
	            return v;
	        }
	    }
	}

	exports['default'] = Fraction;
	module.exports = exports['default'];

/***/ }
/******/ ]);