
var NativeProgressEvent = global.ProgressEvent;
var useNative = !!NativeProgressEvent;

try {
  (function () {
    var p = new NativeProgressEvent('loaded');
    useNative = 'loaded' === p.type;
    p = null;
  })();
} catch (e) {
  useNative = false;
}

/**
 * Cross-browser `ProgressEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent.ProgressEvent
 *
 * @public
 */

module.exports = useNative ? NativeProgressEvent :
function ProgressEvent (type, props) {
  var e = document.createEvent('Event');
  e.initEvent(type, false, false);
  if (props) {
    e.lengthComputable = Boolean(props.lengthComputable);
    e.loaded = Boolean(props.loaded);
    e.total = Boolean(props.total);
  } else {
    e.lengthComputable = e.loaded = e.total = false;
  }
  return e;
};
