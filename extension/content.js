function unbounce() {
  var docEl  = document.documentElement;
  var bodyEl = document.body;
  var docSl  = document.defaultView.getComputedStyle(docEl, '');
  var bodySl = document.defaultView.getComputedStyle(bodyEl, '');
  var docOverflow  = docEl.style.overflow || docSl.overflow;
  var bodyOverflow = bodyEl.style.overflow || bodySl.overflow;
  var bodyPosition = bodyEl.style.position || bodySl.position;
  if((!docOverflow || docOverflow != 'hidden') &&
     (!bodyOverflow || bodyOverflow != 'hidden') &&
     (!bodyPosition || bodyPosition == 'static')) {
    docEl.style.overflow  = 'hidden';
    bodyEl.style.position = 'absolute';
    bodyEl.style.top      = '0';
    bodyEl.style.bottom   = '0';
    bodyEl.style.left     = '0';
    bodyEl.style.right    = '0';
    bodyEl.style.overflow = 'auto';
  }
}

chrome.extension.sendMessage({ 'msg':'hello' }, function(response) {
  if(response.enable) {
    unbounce();
  }
});
