let port = chrome.runtime.connect({ name: "popup" });

//test highlighter
// port.onMessage.addListener((message) => {
//     document.body.innerHTML = message.text;
// });

//spotify test button for pinging spotify on example endpoint instead of waiting for message
document.addEventListener("DOMContentLoaded", () => {
  const spotifyButton = document.getElementById("spotify-button");

  spotifyButton.addEventListener("click", () => {
    const exampleUrl = "http://localhost:3000/example";

    // Get access_token from Chrome Storage API
    chrome.storage.local.get("access_token", (result) => {
      const accessToken = result.access_token;

      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      // Make a request to the /example endpoint
      fetch(exampleUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Process your data here
          console.log(data);

          // For example, you can display it in your popup
          const displayElement = document.getElementById("track-container"); // Assume you have an element with id 'track-container' to show the data
          displayElement.textContent = JSON.stringify(data, null, 2);
        })
        .catch((error) =>
          console.error(
            "There has been a problem with your fetch operation:",
            error
          )
        );
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

chrome.storage.local.set({ accessToken: "xxx" });

//popup.html button
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
