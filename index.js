const express = require("express");
const fs = require("fs");

const webserver = express();

webserver.use("/publicFiles", express.static(__dirname + "/public"));
webserver.use(express.json());

const port = 80;

webserver.get("/", (req, res) => {
  fs.readFile(__dirname + "/public/markup.html", (error, data) => {
    if (error) throw error;
    res.write(data);
    res.end();
  });
});

webserver.post("/vote", (req, res) => {
  fs.readFile(
    __dirname + "/public/voteVariants.json",
    (error, voteVariantsData) => {
      if (error) throw error;
      fs.readFile(
        __dirname + "/public/voteStatistics.json",
        (error, voteStatisticsData) => {
          if (error) throw error;
          const voteStatistics = JSON.parse(voteStatisticsData);
          const voteOptionName = JSON.parse(voteVariantsData).find(
            (item) => item.code === req.body.code
          ).option;
          const previousValue = voteStatistics[voteOptionName] ?? 0;

          voteStatistics[voteOptionName] = previousValue + 1;

          fs.writeFile(
            __dirname + "/public/voteStatistics.json",
            JSON.stringify(voteStatistics),
            (error) => {
              if (error) throw error;
              console.log("/vote", voteStatistics);
              res.end();
            }
          );
        }
      );
    }
  );
});

webserver.post("/stats", (req, res) => {
  fs.readFile(__dirname + "/public/voteStatistics.json", (error, data) => {
    if (error) throw error;
    res.write(data);
    res.end();
  });
});

webserver.get("/download", (req, res) => {
  res.setHeader("Content-Type", req.get("Accept"));
  res.setHeader("Content-Disposition", "attachment");
  fs.readFile(__dirname + "/public/voteStatistics.json", (error, data) => {
    if (error) throw error;
    res.send(data);
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
