require("dotenv").config();
const axios = require("axios");

(async () => {
  try {
    let response = await axios.get(
      `https://graph.facebook.com/${process.env.PAGEID2}/insights/page_fans_city?access_token=${process.env.PAT2}`
    );
    console.log(JSON.stringify(response.data, 0, 2));
    response = await axios.get(
      `https://graph.facebook.com/${process.env.PAGEID2}/insights/page_fans?access_token=${process.env.PAT2}`
    );
    console.log(JSON.stringify(response.data, 0, 2));
  } catch (err) {
    console.log(err);
  }
})();
