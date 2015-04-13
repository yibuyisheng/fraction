class Fraction {
    constructor(molecular, denominator, isNegative) {
        this.molecular = Math.abs(molecular);
        this.denominator = Math.abs(denominator);
        this.isNegative = (molecular < 0) ^ (denominator < 0) ^ isNegative;

        var g = gcd(this.molecular, this.denominator);
        this.molecular /= g;
        this.denominator /= g;
    }

    get isNegative() {
        return this._isNegative;
    }
    set isNegative(value) {
        this._isNegative = !!value;
    }
    get molecular() {
        return this._molecular;
    }
    set molecular(value) {
        if (!isNumber(value) || value < 0) {
            throw TypeError('invalid molecular');
        }
        this._molecular = value;
    }
    get denominator() {
        return this._denominator;
    }
    set denominator(value) {
        if (!isNumber(value) || value <= 0) {
            throw TypeError('invalid denominator');
        }
        this._denominator = value;
    }

    plus(fraction) {
        if (!fraction instanceof Fraction) {
            throw TypeError('wrong type');
        }

        var denominator = lcm(fraction.denominator, this.denominator);
        var molecular = denominator / this.denominator * this.molecular * (this.isNegative ? -1 : 1)
            + denominator / fraction.denominator * fraction.molecular * (fraction.isNegative ? -1 : 1);

        var g = gcd(Math.abs(molecular), denominator);
        return new Fraction(Math.abs(molecular / g), denominator / g, molecular < 0);
    }

    minus(fraction) {
        return this.plus(new Fraction(
            fraction.molecular,
            fraction.denominator,
            !fraction.isNegative
        ));
    }

    times(fraction) {
        var isNegative = !!(fraction.isNegative ^ this.isNegative);
        var molecular = fraction.molecular * this.molecular;
        var denominator = fraction.denominator * this.denominator;

        var g = gcd(Math.abs(molecular), Math.abs(denominator));
        return new Fraction(molecular / g, denominator / g, isNegative);
    }


    toString() {
        return this.isNegative + ' ' + this.molecular + '/' + this.denominator;
    }

    toNumber() {
        return (this.isNegative ? -1 : 1) * this.molecular / this.denominator;
    }

    static fromInterger(value) {
        if (!isNumber(value) || value !== Math.floor(value)) {
            throw TypeError('invalide integer');
        }
        return new Fraction(value, 1);
    }

    static fromFloat(value, precision) {
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
}

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

export default Fraction;