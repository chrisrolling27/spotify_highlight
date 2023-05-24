
document.addEventListener('mouseup', function() {
    let highlightedText = window.getSelection().toString();
    if (highlightedText) {
      chrome.runtime.sendMessage({text: highlightedText});
    }
  });
  





// let highlightedText = window.getSelection().toString();

// console.log(highlightedText);
// // Send the highlighted text back to the background script
// chrome.runtime.sendMessage({text: highlightedText});
