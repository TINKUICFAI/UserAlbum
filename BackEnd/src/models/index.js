const mongoose = require("mongoose");

const newurl = process.env.MONGO_DB_URL;
mongoose.connect(newurl, {});

const con = mongoose.connection;
mongoose.set("debug", false);
con.on("open", () => {
  console.log("connected to database");
});

module.exports = con;
