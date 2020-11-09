const express = require("express");
const { Readable } = require("stream");
const app = express();
const port = 3000;

app.get("/", $ProgressiveRendering);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function $ProgressiveRendering(req, res) {
  const xmlChunks = [
    "<html><body>",
    "<h1>Hello world</h1>",
    "<h2>Hello world</h2>",
    "<h3>Hello world</h3>",
    "<h3>Hello world</h3>",
    "<h3>Hello world</h3>",
    "<h3>Hello world</h3>",
    "<h3>Hello world</h3>",
    "<h3>Hello world</h3>",
    "<h3>Hello world</h3>",
    "<h3>Hello world</h3>",
    "</body></html>",
  ];

  const pageStream = new Readable({
    async read() {
      if (!xmlChunks.length) {
        pageStream.push(null);
      } else {
        const chunk = xmlChunks.shift();
        //Should sent a chunk each 100ms
        await sleep(100);
        pageStream.push(chunk);
      }
    },
  });
  res.status(200);
  res.type("text/html; charset=utf-8");
  pageStream.pipe(res);
}
async function sleep(ms) {
  return new Promise((resolve) => {
    const waitT = setTimeout(() => {
      clearTimeout(waitT);
      resolve();
    }, ms);
  });
}
