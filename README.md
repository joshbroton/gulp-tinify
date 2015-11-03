# gulp-tinify
Minify compatible files using [TinyPNG](https://tinypng.com/)'s API

## Installation
```
npm install --save-dev gulp-tinify
```

## Usage

```js
var gulp = require('gulp');
var tinyimg = require('gulp-tinify');

gulp.task('tinify', function() {
    gulp.src('/img/**/*')
        .pipe(tinyimg('TinyPNGAPIKey'))
        .pipe(gulp.dest('/dest/img'));
});
```

You must have a [TinyPNG Developer API Key](https://tinypng.com/developers) for this to work.

## License

MIT © [Josh Broton](http://joshbroton.com)
