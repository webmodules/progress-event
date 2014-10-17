
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

    it('should create a `ProgressEvent` instance that is dispatchable', function () {
      var p = new PE('progress', {
        lengthComputable: true,
        loaded: 4,
        total: 10
      });

      var called = false;
      var e = document.createElement('div');
      document.body.appendChild(e);

      function onprogress (ev) {
        assert.equal(p.type, 'progress');
        assert.equal(p.lengthComputable, true);
        assert.equal(p.loaded, 4);
        assert.equal(p.total, 10);
        called = true;
      }

      assert(!called);
      if (e.dispatchEvent) {
        e.addEventListener('progress', onprogress, false);
        e.dispatchEvent(p);
      } else {
        // IE <= 8 will only allow us to fire "known" event names,
        // so we need to fire "click" instead of "progress :\
        e.attachEvent('onclick', onprogress);
        e.fireEvent('onclick', p);
      }
      assert(called);
    });

  });

});
