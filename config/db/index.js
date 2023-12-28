const mongoose = require("mongoose");
// const { DB_USER, DB_PASS, DB_NAME } = require("../");

mongoose.connect(
  `mongodb://127.0.0.1:27017`
);

module.exports = mongoose;
