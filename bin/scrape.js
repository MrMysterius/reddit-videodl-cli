const axios = require("axios").default;
const cheerio = require("cheerio");

const getID = async function (url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        const $ = cheerio.load(res.data);

        const videoURL = $('meta[property="og:video"]')?.attr()?.content || undefined;
        if (!videoURL) return reject("Didn't find video url");

        const id = videoURL.match(/(?<=https:\/\/v\.redd\.it\/).+(?=\/)/)[0] || undefined;
        if (!id) return reject("Coudn't get an id");

        return resolve(id);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = { getID };
