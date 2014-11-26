'use strict';

var bindings = require('bindings')('flush_all');

var go = module.exports = function flushAll() {
  bindings.flush_all();    
}
