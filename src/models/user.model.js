"use strict";

const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "User";

var userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

module.exports = model(DOCUMENT_NAME, userSchema);
