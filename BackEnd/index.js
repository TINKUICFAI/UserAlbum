const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 100000000 },
  })
);

var path = require("path");
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.send("Hello project started!");
});

app.use("/api/v1", require("./src/routes"));
app.listen(4000, () => {
  console.log("Server is listening on post 4000");
});
