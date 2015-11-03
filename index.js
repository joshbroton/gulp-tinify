// through2 is a thin wrapper around node transform streams
var fs          = require('fs'),
    path        = require('path'),
    through     = require('through2-concurrent'),
    gutil       = require('gulp-util'),
    tinify      = require('tinify'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-tinyimg';

function tinypng(apiKey, file) {
    var validExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

    if(!apiKey) {
        throw new PluginError(PLUGIN_NAME, 'We can\'t upload images without your API Key');
    }
    tinify.key = apiKey;

    var stream = through.obj(function(file) {
        if(file.isNull()) {
            return;
        }

        if(file.isStream()) {
            throw new PluginError(PLUGIN_NAME, 'Streams are not supported');
        }

        if(validExtensions.indexOf(path.extname(file.path)) === -1) {
            gutil.log(PLUGIN_NAME + ': Skipping unsupported image ' + file.path);
            return;
        }

        tinify.fromBuffer(file.contents).toBuffer(function(err, resultData) {
            if(err) throw new PluginError(PLUGIN_NAME, err);

            file.contents = resultData;
            stream.push(file);
        })
    });

    return stream;
};
// Exporting the plugin main function
module.exports = tinypng;
