"use strict";

const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "User";

var userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: String,
    avatar: String,
    bio: String,
    expertise: {
      type: [String],
      require: true,
    },
    experience: {
      type: Number,
      require: true,
    },
    role: {
      type: String,
      enum: ["admin", "creator", "member"],
      default: "member",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

module.exports = model(DOCUMENT_NAME, userSchema);
