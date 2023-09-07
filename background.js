const client_id = '8ef6dbd924b0409096d71efaf570610e';
const redirect_url = chrome.identity.getRedirectURL();

console.log('start of background.js');

//new onInstalled
chrome.runtime.onInstalled.addListener(function() {
  console.log('here?');
  getSpotifyToken();
});

function getSpotifyToken() {
  console.log('here2');
  const clientId = '8ef6dbd924b0409096d71efaf570610e';
  const redirectUri = chrome.identity.getRedirectURL('callback');
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=playlist-read-private`;

  chrome.identity.launchWebAuthFlow(
    {
      url: authUrl,
      interactive: true,
    },
    function (redirectedTo) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
      
      // Extract token from the URL
      const url = new URL(redirectedTo);
      const hash = url.hash.substring(1);

      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');

      // Use access_token to make Spotify API calls
      // Store it or use it for immediate API calls
      console.log(`Received access token: ${accessToken}`);
    }
  );
}



chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    code: "console.log('Clicked!');"
  });
});


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
  //console.log(selectedText);
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
