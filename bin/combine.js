const path = require("path");
const { exec } = require("child_process");

const combine = async function (id, isAudio) {
  return new Promise((resolve) => {
    if (isAudio) {
      exec(`sh ${path.resolve(__dirname, "convert-with-audio.sh")} ${id}`, (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return resolve(false);
        }
        console.log(stdout);
        if (stderr) {
          console.log(stderr);
          return resolve(false);
        }
        return resolve(true);
      });
    } else {
      exec(`sh ${path.resolve(__dirname, "convert-only-video.sh")} ${id}`, (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return resolve(false);
        }
        console.log(stdout);
        if (stderr) {
          console.log(stderr);
          return resolve(false);
        }
        return resolve(true);
      });
    }
  });
};

module.exports = { combine };
