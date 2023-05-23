chrome.action.onClicked.addListener((tab) => {
  // Execute a content script in the active tab
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ["contentScript.js"]
  });
});
