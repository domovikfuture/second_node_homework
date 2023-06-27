const express = require("express");

const webserver = express();

webserver.use("/jsFiles", express.static(__dirname + "/public"));

const port = 3000;

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

webserver.get("/", (req, res) => {
  res.send(
    `<html lang="en">
     <head>
      <meta charset="UTF-8">
      <meta name="viewport content=width=device-width, initial-scale=1.0">
      <title>Document</title>
      <script src="./jsFiles/script.js" type="text/javascript"></script>
     </head>
    <body>
      <h1>Homework 2</h1>
      <div class="buttons"></div>
    </body>
    </html>`
  );
});

webserver.get("/variants", (req, res) => {
  res.send(voteVariants);
});

webserver.listen(port, () => {
  console.log("web server running on port " + port);
});
