const mongoose = require("mongoose");
const schemaType = require("../../types");

const profileSchema = new mongoose.Schema(
  {
    first_name: {
      type: schemaType.TypeString,
      required: true,
    },
    last_name: {
      type: schemaType.TypeString,
      required: true,
    },
    gender: {
      type: schemaType.TypeString,
      requried: true,
    },
    avatar: {
      type: schemaType.TypeString,
      requried: true,
    },
    created_date: {
      type: schemaType.TypeDate,
      default: Date.now,
    }
  },
  { timestamps: true }
);

module.exports = profileSchema;
