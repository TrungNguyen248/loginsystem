"use strict";

const { SuccessResponse } = require("../core/success.response");
const ProfileService = require("../services/profile.service");

class ProfileController {
  getProfileCtr = async (req, res, next) => {
    new SuccessResponse({
      message: "Get profile successfully",
      metadata: await ProfileService.getProfile({
        userId: req.user.userId,
      }),
    }).send(res);
  };

  updateProfileCtr = async (req, res, next) => {
    new SuccessResponse({
      message: "Update profile successfully",
      metadata: await ProfileService.updateProfile({
        userId: req.user.userId,
        ...req.body,
      }),
    }).send(res);
  };

  changePwCtr = async (req, res, next) => {
    new SuccessResponse({
      message: "Change pw success",
      metadata: await ProfileService.changePass({
        userId: req.user.userId,
        ...req.body,
      }),
    }).send(res);
  };

  updateAvatarCtr = async (req, res, next) => {
    new SuccessResponse({
      message: "Upload success",
      metadata: await ProfileService.updateAvatar({
        userId: req.user.userId,
        ...req,
      }),
    }).send(res);
  };
}

module.exports = new ProfileController();
