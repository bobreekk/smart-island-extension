chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'GET_TABS_COUNT') {
    chrome.tabs.query({}, (tabs) => sendResponse({ count: tabs.length }));
    return true;
  }
  
  if (request.action === 'CONTROL_MEDIA') {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.audible) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
              const media = document.querySelector('audio, video');
              if (media) {
                media.paused ? media.play() : media.pause();
              } else {
                document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', keyCode: 32, bubbles: true }));
              }
            }
          }).catch(() => {});
        }
      });
    });
  }
});