const mongoose = require("mongoose");
const contactSchema = require("./contact-schema");

const contact = mongoose.model("contacts", contactSchema);

module.exports = contact;
