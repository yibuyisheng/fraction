class Fraction {
    constructor(molecular, denominator, isNegative) {
        this.molecular = molecular;
        this.denominator = denominator;
        this.isNegative = isNegative;
    }

    get isNegative() {
        return this._isNegative;
    }
    set isNegative(value) {
        this._isNegative = value;
    }
    get molecular() {
        return this._molecular;
    }
    set molecular(value) {
        this._molecular = value;
    }
    get denominator() {
        return this._denominator;
    }
    set denominator(value) {
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
        return new Fraction(molecular / g, denominator / g);
    }

    minus(fraction) {
        return this.plus(new Fraction(
            fraction.molecular,
            fraction.denominator,
            !fraction.isNegative
        ));
    }


    toString() {
        return this.molecular + '/' + this.denominator;
    }
}


// 最大公约数
function gcd(a, b) {
    var min = Math.min(a, b);
    var max = Math.max(a, b);

    for (var i = min; i > 0; i--) {
        if (max % i === 0 && min % i === 0) {
            return i;
        }
    }
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