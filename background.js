chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'loadFile') {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', request.fileUrl, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        sendResponse(xhr.responseText);
      }
    };
    xhr.send();
    return true;
  }
});

