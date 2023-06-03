let selectedText = "";

// listening to messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  selectedText = request.text; // save the selected text
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['contentScript.js']
  }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    }
  });
});

// sending the selected text to the popup
chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name == "popup");
  console.log(selectedText);
  port.postMessage({text: selectedText});
});
