let port = chrome.runtime.connect({ name: "popup" });
port.onMessage.addListener((message) => {

  let query = encodeURIComponent(message.text);
  let url = `https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=5`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      highlightedText: message.text,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.body.innerHTML = `<h1>Response: ${JSON.stringify(data)}</h1>`;
    });
});
