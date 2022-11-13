var express = require("express");
var app = express();
var path = require("path");
console.log(__dirname);
app.use("/app", express.static(__dirname + "/app"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/app/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
