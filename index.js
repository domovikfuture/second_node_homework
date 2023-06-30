const express = require("express");
const fs = require("fs");
const webserver = express();

webserver.use("/publicFiles", express.static(__dirname + "/public"));
webserver.use(express.json());

const port = 80;

const voteStatistics = new Map();

webserver.get("/", (req, res) => {
  fs.readFile(__dirname + "/public/markup.html", (error, data) => {
    if (error) throw error;
    res.write(data);
    res.end();
  });
});

webserver.post("/vote", (req, res) => {
  fs.readFile(__dirname + "/public/voteVariants.json", (error, data) => {
    if (error) throw error;
    const voteOptionName = JSON.parse(data).find(
      (item) => item.code === req.body.code
    ).option;
    const previousValue = voteStatistics.get(voteOptionName) ?? 0;
    voteStatistics.set(voteOptionName, previousValue + 1);
    res.send({ stats: [...voteStatistics] });
  });
});

webserver.get("/variants", (req, res) => {
  fs.readFile(__dirname + "/public/voteVariants.json", (error, data) => {
    if (error) throw error;
    res.write(data);
    res.end();
  });
});

webserver.listen(port, () => {
  console.log("web server running on port " + port);
});
