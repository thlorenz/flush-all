'use strict';

// tests needs to run with node>=0.11 to support perf-basic-prof flag
// however the module itself works with older node versions as well

var test = require('tap').test
  , fs = require('fs')
  , os = require('os')
  , flushAll = require('../')

test('\nflushing will cause perf file to be flushed', function (t) {
  var stat;
  var pid = process.pid;
  var mapFile = '/tmp/perf-' + pid + '.map';

  t.ok(fs.existsSync(mapFile), 'map file exists')

  stat = fs.statSync(mapFile);

  var firstSize = stat.size;
  // Linux flushes too aggressively 
  if (os.platform() === 'darwin') 
    t.equal(firstSize, 0, 'and on darwin its size is 0 since it has not been flushed yet')

  flushAll();

  stat = fs.statSync(mapFile);
  // The below by itself is not really a proof since just calling 'flushAll' causes more JIT code to be generated which by 
  // itself would increase the map file size.
  // However since Linux flushes more aggressively this is as good as we can do there.
  // On darwin, we can show that before flushAll nothing got flushed and afterwards it did which is the 
  // actual proof that this works.
  t.ok(stat.siz > firstSize, 'after I flush all, the map file size is larger than before and non-zero since has been flushed')

  console.log('size before flushAll()', firstSize);
  console.log('size after  flushAll()', stat.size);
  t.end()
})
