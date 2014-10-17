
var assert = require('assert');
var PE = require('../');

describe('ProgressEvent', function () {

  describe('new ProgressEvent()', function () {

    it('should create a `ProgressEvent` instance', function () {
      var p = new PE('progress');

      assert.equal(p.type, 'progress');
      assert.equal(p.lengthComputable, false);
      assert.equal(p.loaded, 0);
      assert.equal(p.total, 0);
    });

    it('should create a `ProgressEvent` instance with `lengthComputable`', function () {
      var p = new PE('progress', { lengthComputable: true });

      assert.equal(p.type, 'progress');
      assert.equal(p.lengthComputable, true);
      assert.equal(p.loaded, 0);
      assert.equal(p.total, 0);
    });

  });

});
