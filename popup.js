let port = chrome.runtime.connect({ name: "popup" });

//test highlighter
// port.onMessage.addListener((message) => {
//     document.body.innerHTML = message.text;
// });

port.onMessage.addListener((message) => {

//let query = "Kendrick%20Lamar%20Swimming%20Pools";
  let query = encodeURIComponent(message.text);
  

  let listamount = 3;

  //let url = `https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=${listamount}`;
  let url = `http://localhost:3000/example`;


  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + '',
      "Content-Type": "application/json",
    }
  })

    .then((response) => response.json())
    .then((data) => {
      if (data && data.tracks && data.tracks.items) {
        let htmlContent = "<h1>Tracks:</h1>";
    
        data.tracks.items.forEach(track => {
          htmlContent += `
          <div>
            <h2>${track.name}</h2>
            <p>Album: ${track.album.name}</p>
            <p>Artist: ${track.artists[0].name}</p>
            <p><a href="${track.external_urls.spotify}">Listen on Spotify</a></p>
            <img src="${track.album.images[0].url}" alt="Album cover for ${track.album.name}">
          </div>`;
        });
    
        document.body.innerHTML = htmlContent;
      } else {
        document.body.innerHTML = "<h1>No tracks found!</h1>";
      }
    });
});
