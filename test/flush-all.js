'use strict';

// tests needs to run with node>=0.11 to support perf-basic-prof flag
// however the module itself works with older node versions as well

var test = require('tap').test
  , fs = require('fs')
  , flushAll = require('../')

test('\nflushing will cause perf file to be flushed', function (t) {
  var stat;
  var pid = process.pid;
  var mapFile = '/tmp/perf-' + pid + '.map';

  t.ok(fs.existsSync(mapFile), 'map file exists')

  stat = fs.statSync(mapFile);
  t.equal(stat.size, 0, 'and its size is 0 since it has not been flushed yet')

  flushAll();

  stat = fs.statSync(mapFile);
  t.notEqual(stat.size, 0, 'after I flush all, the map file size is no longer 0 since it has been flushed')

  t.end()
})
