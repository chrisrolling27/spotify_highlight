let port = chrome.runtime.connect({ name: "popup" });

chrome.storage.local.set({ accessToken: "xxx" });

//spotify /example pinger 
document.addEventListener("DOMContentLoaded", () => {
  const spotifyButton = document.getElementById("spotify-button");
  const trackContainer = document.getElementById("track-container");

  spotifyButton.addEventListener("click", () => {
    // Fetch the "name" from chrome.storage.local
    chrome.storage.local.get(["accessToken"], (result) => {

      const accessToken = result.accessToken;
      const exampleURL = "http://localhost:3000/example";

      // Fetch data from the exampleURL
      fetch(exampleURL, {
        headers: {
          "access": accessToken,
        },
      })
        .then((response) => {
          // Parse the response as JSON
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to load data");
          }
        })
        .then((data) => {
          // Use the JSON data to display in the trackContainer
          trackContainer.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          trackContainer.innerHTML = "Failed to load data";
        });
    });
  });
});





//real listener that takes message from highlighted text to the backend.
// port.onMessage.addListener((message) => {
//   //let query = "Kendrick%20Lamar%20Swimming%20Pools";
//   let query = encodeURIComponent(message.text);

//   let listamount = 3;

//   //let url = `https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=${listamount}`;
//   let url = `http://localhost:3000/example`;

//   fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer " + "",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const trackContainer = document.getElementById("track-container");

//       if (data && data.tracks && data.tracks.items) {
//         let htmlContent = "<h1>Tracks:</h1>";

//         data.tracks.items.forEach((track) => {
//           htmlContent += `
//               <div>
//                   <h2>${track.name}</h2>
//                   <p>Album: ${track.album.name}</p>
//                   <p>Artist: ${track.artists[0].name}</p>
//                   <p><a href="${track.external_urls.spotify}">Listen on Spotify</a></p>
//                   <img src="${track.album.images[0].url}" alt="Album cover for ${track.album.name}">
//               </div>`;
//         });

//         trackContainer.innerHTML = htmlContent;
//       } else {
//         trackContainer.innerHTML = "<h1>No tracks found!</h1>";
//       }
//     });
// });

//test highlighter
// port.onMessage.addListener((message) => {
//     document.body.innerHTML = message.text;
// });