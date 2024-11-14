"use strict";

const { SuccessResponse } = require("../core/success.response");
const ProfileService = require("../services/profile.service");

module.exports = {
  uploadSingleFile: async (req, res, next) => {
    res.json(req.files);
  },
  uploadMultipleFiles: async (req, res) => {
    res.json(req.files);
  },
};
