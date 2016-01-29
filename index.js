// through2 is a thin wrapper around node transform streams
var fs          = require('fs'),
    path        = require('path'),
    through     = require('through2-concurrent'),
    gutil       = require('gulp-util'),
    tinify      = require('tinify'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-tinyimg';

function tinypng(apiKey, file) {
    var validExtensions = ['.png', '.jpg', '.jpeg'];

    if(!apiKey) {
        throw new PluginError(PLUGIN_NAME, 'We can\'t upload images without your API Key');
    }
    tinify.key = apiKey;

    return through.obj(function(file, enc, cb) {
        if(file.isNull()) {
            cb(null, file);
            return;
        }

        if(file.isStream()) {
            cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }

        if(validExtensions.indexOf(path.extname(file.path)) === -1) {
            gutil.log(PLUGIN_NAME + ': Skipping unsupported image ' + file.path);
            cb(null, file);
            return;
        }

        tinify.fromBuffer(file.contents).toBuffer(function(err, resultData) {
            if(!err) {
              file.contents = resultData;
            }
            cb(null, file);
        })
    });
};
// Exporting the plugin main function
module.exports = tinypng;