# [gulp](https://github.com/creative/gulp-tinyimg)-tinyimg
Minify compatible files using [tinypng](https://tinypng.com/)'s API

## Installation
```
npm install --save-dev gulp-tinyimg
```

## Usage

```js
var gulp = require('gulp');
var tinyimg = require('gulp-tinyimg');

gulp.task('tinyimg', function() {
    gulp.src('/img/**/*')
        .pipe(tinyimg('TinyPNGAPIKey'))
        .pipe(gulp.dest('/dest/img'));
});
```

You must have a [TinyPNG Developer API Key](https://tinypng.com/developers) for this to work.

## License

MIT © [Josh Broton](http://joshbroton.com)
