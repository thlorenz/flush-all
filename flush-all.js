'use strict';

var binding = require('nad-bindings')('flush_all');

var go = module.exports = function flushAll() {
  binding.flush_all();    
}
