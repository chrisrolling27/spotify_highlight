const express = require("express");
const dotenv = require("dotenv");
const querystring = require("querystring");
const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.listen(port, () => {
  console.log(`server listening to http://localhost:${port}`);
});

app.get("/login", (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`
  );
});
