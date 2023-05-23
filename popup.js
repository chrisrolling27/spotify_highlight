chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      fetch('http://localhost:3000/spotify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          highlightedText: request.text
        })
      }).then((response) => response.json())
      .then((data) => {
        document.body.innerHTML = `<h1>Response: ${JSON.stringify(data)}</h1>`;
      });
    }
  );
  