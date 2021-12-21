# Spotify dataset for recommender systems

Using the `index.js` script we will augment a [spotify dataset](https://zenodo.org/record/2594557#.YcG4AX37RTY) with the genres of the artist and in addition filter the dataset to include only entries
from the **Starred** playlist. To augment the script we will use the [Spotify API](https://developer.spotify.com/documentation/web-api/). One will need to create a spotify app in order to get a Client ID and a Client Secret to access the API.

Steps:

- Create a `.env` file and fill in the following environment variables:
  - SPOTIFY_CLIENT_ID
  - SPOTIFY_CLIENT_SECRET
- Do an `npm install`
- Put the [spotify dataset](https://zenodo.org/record/2594557#.YcG4AX37RTY) inside the data directory
- Run the script to augment and transform the dataset: `node index.js`
