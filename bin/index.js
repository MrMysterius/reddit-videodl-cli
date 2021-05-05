#!/usr/bin/env node

const yargs = require("yargs");

const { combine } = require("./combine");
const { getID } = require("./scrape");
const { downloadAudio, downloadVideo } = require("./download");

let options = yargs
  .usage("-u <reddit thread url>")
  .option("u", { alias: "url", describe: "Reddit Thread URL from which to download video from", type: "string", demandOption: true }).argv;

console.log(options.u);

getID(options.u)
  .then(async (id) => {
    if (!(await downloadVideo(id))) return;
    if (!(await downloadAudio(id))) return;

    if (!(await combine(id))) return;
  })
  .catch((err) => {
    console.log(err);
  });
