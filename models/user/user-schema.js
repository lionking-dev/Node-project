const mongoose = require("mongoose");
const schemaType = require("../../types");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: schemaType.TypeString,
      required: true,
      unique: true,
    },
    username: {
      type: schemaType.TypeString,
      required: true,
    },
    password: {
      type: schemaType.TypeString,
      requried: true,
    },
    profile: {
      type: schemaType.TypeObjectId,
      ref: 'profiles',
      required: true
    },
    created_date: {
      type: schemaType.TypeDate,
      default: Date.now,
    }
  },
  { timestamps: true }
);

module.exports = userSchema;
