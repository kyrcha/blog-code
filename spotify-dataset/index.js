require("dotenv").config();
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const converter = require("json-2-csv");
const axios = require("axios");
const qs = require("qs");

// main
async function processLineByLine() {
  var client_id = process.env.SPOTIFY_CLIENT_ID;
  var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const data = { grant_type: "client_credentials" };
  const options = {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "content-type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(data),
    url: "https://accounts.spotify.com/api/token",
  };
  const response = await axios(options);

  const { access_token } = response.data;

  console.log(access_token);

  const fileStream = fs.createReadStream(
    path.join(__dirname, "data", "spotify_dataset.csv")
  );

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const dataset = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    let tokens = line.split('","');
    tokens = tokens.map((token) => token.replace('"', ""));
    if (tokens[3] === "Starred") {
      //   console.log(`Line from file: ${line}`);
      dataset.push({
        user: tokens[0],
        item: tokens[2],
        artist: tokens[1],
      });
      try {
        let options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + access_token,
          },
          url: `https://api.spotify.com/v1/search?q=${tokens[1]} ${tokens[2]}&type=track&limit=1`,
        };
        console.log(`${tokens[1]} ${tokens[2]}`);
        await new Promise((resolve) => setTimeout(resolve, 333));
        const search_response = await axios(options);
        const songid = search_response.data.tracks.items[0].id;
        options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + access_token,
          },
          url: `https://api.spotify.com/v1/tracks/${songid}`,
        };
        await new Promise((resolve) => setTimeout(resolve, 333));
        const track_response = await axios(options);
        const artistid = track_response.data.album.artists[0].id;
        options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + access_token,
          },
          url: `https://api.spotify.com/v1/artists/${artistid}`,
        };
        await new Promise((resolve) => setTimeout(resolve, 333));
        const artist_response = await axios(options);
        const genres = artist_response.data.genres;
        console.log(genres);
      } catch (error) {
        console.log("skip");
      }
    }
  }

  const csv = await converter.json2csvAsync(dataset);
  // write CSV to a file
  fs.writeFileSync(path.join(__dirname, "data", "output.csv"), csv);
}

processLineByLine();
