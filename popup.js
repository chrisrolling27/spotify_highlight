let port = chrome.runtime.connect({name: "popup"});
port.onMessage.addListener((message) => {
  // send the post request with highlighted text received from the background
  fetch('http://localhost:3000/spotify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      highlightedText: message.text
    })
  }).then((response) => response.json())
  .then((data) => {
    document.body.innerHTML = `<h1>Response: ${JSON.stringify(data)}</h1>`;
  });
});
