function extractDomain(url) {
  var match = /^(?:https?|ftp):\/\/([^\/]+)/.exec(url || '');
  return match ? decodeURIComponent(match[1]) : null;
};

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  var domain = extractDomain(sender.tab.url);
  var enable = domain && !localStorage.getItem('domain_' + domain);
  chrome.browserAction.setBadgeText({text:enable ? '' : '×', tabId:sender.tab.id});
  sendResponse({ enable:enable });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  var domain = extractDomain(tab.url);
  if(domain) {
    chrome.browserAction.getBadgeText({tabId:tab.id}, function(text) {
      if(text) {
        localStorage.removeItem('domain_' + domain);
        console.log('Turn unbounce on for ' + domain);
        chrome.browserAction.setBadgeText({text:'', tabId:tab.id});
      } else {
        localStorage.setItem('domain_' + domain, 'off');
        console.log('Turn unbounce off for ' + domain);
        chrome.browserAction.setBadgeText({text:'×', tabId:tab.id});
      }
    });
  }
});
