var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');

gulp.task('js-pack', function(done) {
    webpack({
        entry: {
            index: path.join(__dirname, 'index.js')
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        module: {
            loaders: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ]
        },
        bail: true
    }, function(err) {
        if (err) {
            console.log(err);
        }
        done();
    });
});

gulp.task('watch', ['js-pack'], function () {
    return gulp.watch(['index.js', './src/**', './src/**/*.js'], ['js-pack']);
});