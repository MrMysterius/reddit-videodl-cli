const https = require("https");
const path = require("path");
const fs = require("fs");

const files = {
  host_url: "https://v.redd.it/{id}/{file}",
  video: ["DASH_720.mp4", "DASH_480.mp4", "DASH_240.mp4"],
  audio: ["DASH_audio.mp4"],
};

const downloadVideo = async function (id, attempt = 0) {
  if (attempt == files.video.length) return false;
  return new Promise((resolve) => {
    const url = files.host_url.replace(/{id}/g, id).replace(/{file}/g, files.video[attempt]);
    console.log(url);
    https.get(url, (res) => {
      if (res.statusCode == "403") return resolve(await downloadVideo(id, ++attempt));
      let file = fs.createWriteStream(path.resolve(process.cwd(), `${id}_video.mp4`), { autoClose: true });

      res.on("data", (chunk) => {
        file.write(chunk);
      });

      res.on("end", () => {
        file.close();
        resolve(true);
      });

      res.on("error", async (err) => {
        file.close();
        resolve(await downloadVideo(id, ++attempt));
      });
    });
  });
};

const downloadAudio = async function (id, attempt = 0) {
  if (attempt == files.audio.length) return false;
  return new Promise((resolve) => {
    const url = files.host_url.replace(/{id}/g, id).replace(/{file}/g, files.audio[attempt]);
    console.log(url);
    https.get(url, (res) => {
      if (res.statusCode == "403") return resolve(await downloadAudio(id, ++attempt));
      let file = fs.createWriteStream(path.resolve(process.cwd(), `${id}_audio.mp4`), { autoClose: true });

      res.on("data", (chunk) => {
        file.write(chunk);
      });

      res.on("end", () => {
        file.close();
        resolve(true);
      });

      res.on("error", async (err) => {
        file.close();
        resolve(await downloadAudio(id, ++attempt));
      });
    });
  });
};

module.exports = { downloadAudio, downloadVideo };
