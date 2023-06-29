const express = require("express");
const dotenv = require("dotenv");
const querystring = require("querystring");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const stateKey = "spotify_auth_state";

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get("/", (req, res) => {
  res.send("server index.js running!");
});

app.get("/success", (req, res) => {
  res.send("success endpoint hit!");
});

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = "user-read-private user-read-email";

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token } = response.data;

        // Send a page to set access_token in localStorage
        res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Token Handler</title>
            <script>
              localStorage.setItem('access_token', '${access_token}');
              window.location.href = '/success'; // Redirect to success page
            </script>
          </head>
          <body></body>
        </html>
      `);
      } else {
        res.send(response);
      }
    })

    .catch((error) => {
      res.send(error);
    });
});

app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/example", (req, res) => {
  let query = "Kendrick%20Lamar%20Swimming%20Pools";

  let listamount = 3;

  let url = `https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=${listamount}`;

  const spotifyHeaders = {
    Authorization: "Bearer " + "YOUR_SPOTIFY_ACCESS_TOKEN",
    "Content-Type": "application/json",
  };

  axios
    .get(url, { headers: spotifyHeaders })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching data from Spotify" });
    });
});

app.listen(port, () => {
  console.log(`server listening to http://localhost:${port}`);
});
