chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.text) {
          fetch('http://localhost:3000/spotify', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({text: request.text})
          }).then(response => response.json())
            .then(data => sendResponse({data: data}))
            .catch(err => console.error(err));
      }
      // This return statement is required to tell the browser that the response will be sent asynchronously
      return true;  
  }
);
