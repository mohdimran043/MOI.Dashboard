const fs = require('fs');
// const browserify = require('browserify')
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';
// const mumble_stream_data = 'node_modules/mumble-streams/lib/data.js';

fs.readFile(f, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true, fs: "empty"}');

  fs.writeFile(f, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});