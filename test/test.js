
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

    it('should create a `ProgressEvent` instance that is dispatchable', function (done) {
      var p = new PE('progress', {
        lengthComputable: true,
        loaded: 4,
        total: 10
      });

      function onprogress (ev) {
        if (!ev) ev = window.event;
        assert.equal(ev.lengthComputable, true);
        assert.equal(ev.loaded, 4);
        assert.equal(ev.total, 10);
        done();
      }

      if (document.body.dispatchEvent) {
        document.body.addEventListener('progress', onprogress, false);
        document.body.dispatchEvent(p);
      } else {
        // IE <= 8 will only allow us to fire "known" event names,
        // so we need to fire "click" instead of "progress :\
        document.body.attachEvent('onclick', onprogress);

        // need to fire event in a separate tick for some reason…
        setTimeout(function () {
          p.type = 'click';
          p.eventName = 'click';
          p.eventType = 'click';

          document.body.fireEvent('onclick', p);
        }, 50);
      }
    });

  });

});
