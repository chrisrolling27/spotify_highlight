let selectedText = "";

// listening to messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  selectedText = request.text; // save the selected text
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["contentScript.js"],
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      }
    }
  );
});

// sending the selected text to the popup
chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name == "popup");
  console.log(selectedText);
  port.postMessage({ text: selectedText });
});


// const fetchToken = () => {
//   const url = "localhost:3000/callback
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       // Save the token in chrome storage
//       chrome.storage.local.set({accessToken: data.access_token});
//     })
//     .catch(error => {
//       console.error("Error fetching token:", error);
//     });
// };
// // Fetch token initially
// fetchToken();

// // Set up periodic token refresh
// setInterval(fetchToken, refreshTokenInterval);
