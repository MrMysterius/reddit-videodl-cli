const path = require("path");
const { exec } = require("child_process");

const combine = async function (id) {
  return new Promise((resolve) => {
    exec(`sh ${path.resolve(__dirname, "convert.sh")} ${id}`, (err, stdout, stderr) => {
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
  });
};

module.exports = { combine };
