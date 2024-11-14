"use strict";

const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Key";

var keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    privateKey: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshTokensUsed: {
      type: Array,
      default: [],
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Keys",
    timestamps: true,
  }
);

module.exports = model(DOCUMENT_NAME, keyTokenSchema);
