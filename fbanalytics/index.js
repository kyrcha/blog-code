require("dotenv").config();
const axios = require("axios");
const http = require('http');
const express = require("express");
const path = require("path");

const stateParam = "123";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/facebook", function (req, res, next) {
  res.redirect(
    `https://www.facebook.com/v11.0/dialog/oauth?client_id=${process.env.APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&state=${stateParam}&scope=pages_show_list,read_insights,pages_read_engagement`
  );
});

app.get("/callback", async function (req, res, next) {
  const { code, error, error_code, error_description } = req.query;
  if (error) {
    return res.render("error", {
      error: { status: error_code, stack: JSON.stringify(req.query) },
      message: error_description,
    });
  }
  try {
    // Ask for a short lived user access token
    let response = await axios.get(
      `https://graph.facebook.com/v11.0/oauth/access_token?client_id=${process.env.APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&client_secret=${process.env.APP_SECRET}&code=${code}`
    );
    let access_token = response.data.access_token;
    // Exchange the short lived for a long lived user access token
    response = await axios.get(
      `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&fb_exchange_token=${access_token}`
    );
    access_token = response.data.access_token;
    // Get your user id with the access token
    response = await axios.get(
      `https://graph.facebook.com/v11.0/me?fields=id,name&access_token=${access_token}`
    );
    const { id } = response.data;
    // Finaly get page access tokens that do not expire in order to crawl the api later
    response = await axios.get(
      `https://graph.facebook.com/${id}/accounts?fields=name,access_token&access_token=${access_token}`
    );
    res.render("success", { response: JSON.stringify(response.data) });
  } catch (err) {
    console.log(err);
    res.render("error", { title: "Error" });
  }
});

app.get("/", function (req, res, next) {
  res.render("index");
});

var port = process.env.PORT || 3000;
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  }