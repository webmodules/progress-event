
var NativeProgressEvent = (typeof global !== 'undefined' && global.ProgressEvent) ||
                          (typeof window !== 'undefined' && window.ProgressEvent);
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

// IE >= 9
'function' === typeof document.createEvent ? function ProgressEvent (type, props) {
  var e = document.createEvent('Event');
  e.initEvent(type, false, false);
  if (props) {
    e.lengthComputable = Boolean(props.lengthComputable);
    e.loaded = Number(props.loaded) || 0;
    e.total = Number(props.total) || 0;
  } else {
    e.lengthComputable = false;
    e.loaded = e.total = 0;
  }
  return e;
} :

// IE <= 8
function ProgressEvent (type, props) {
  var e = document.createEventObject();
  e.type = type;
  if (props) {
    e.lengthComputable = Boolean(props.lengthComputable);
    e.loaded = Number(props.loaded) || 0;
    e.total = Number(props.total) || 0;
  } else {
    e.lengthComputable = false;
    e.loaded = e.total = 0;
  }
  return e;
}
