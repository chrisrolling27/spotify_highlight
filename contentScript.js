let highlightedText = window.getSelection().toString();

// Send the highlighted text back to the background script
chrome.runtime.sendMessage({text: highlightedText});
