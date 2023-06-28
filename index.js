const express = require("express");

const webserver = express();

webserver.use("/jsFiles", express.static(__dirname + "/public"));
webserver.use(express.json());

const port = 3000;

const html = `<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport content=width=device-width, initial-scale=1.0">
 <title>Document</title>
 <script src="./jsFiles/script.js" type="text/javascript"></script>
</head>
<body>
 <h1>Homework 2</h1>
 <div class="buttons"></div>
 <br>
 <div class="stats"></div>
</body>
</html>`;

const voteVariants = [
  {
    option: "JavaScript",
    code: 1,
  },
  {
    option: "PHP",
    code: 2,
  },
  {
    option: "Python",
    code: 3,
  },
];

const voteStatistics = new Map();

webserver.get("/", (req, res) => {
  res.send(html);
});

webserver.post("/vote", (req, res) => {
  const voteOptionName = voteVariants.find(
    (item) => item.code === req.body.code
  ).option;
  const previousValue = voteStatistics.get(voteOptionName) ?? 0;
  voteStatistics.set(voteOptionName, previousValue + 1);
  res.send(200);
});

webserver.get("/stats", (req, res) => {
  res.send({ stats: [...voteStatistics] });
});

webserver.get("/variants", (req, res) => {
  res.send(voteVariants);
});

webserver.listen(port, () => {
  console.log("web server running on port " + port);
});
