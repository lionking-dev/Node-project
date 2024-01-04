const mongoose = require("mongoose");
const profileSchema = require("./profile-schema");

const profile = mongoose.model("profiles", profileSchema);

module.exports = profile;