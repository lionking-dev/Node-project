const mongoose = require("mongoose");
const schemaType = require("../../types");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: schemaType.TypeString,
      required: true,
    },
    phone: {
      type: schemaType.TypeString,
      required: true,
    },
    email: {
      type: schemaType.TypeString,
      required: false,
    },
    memo: {
      type: schemaType.TypeString,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = contactSchema;
