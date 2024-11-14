"use strict";

const { NotFoundError, BadRequestError } = require("../core/error.response");
const userModel = require("../models/user.model");
const { getInfoData } = require("../utils");
const bcrypt = require("bcrypt");
const upload = require("../services/upload.service");
const { removeUnderfinedObjectKey } = require("../utils");

class ProfileService {
  static getProfile = async ({ userId }) => {
    const userExist = await userModel.findById(userId).lean();
    if (!userExist) throw new NotFoundError("Không tồn tại user");

    return {
      user: {
        ...getInfoData({
          fields: [
            "email",
            "fullName",
            "phone",
            "avatar",
            "bio",
            "expertise",
            "experience",
            "status",
            "role",
          ],
          object: userExist,
        }),
      },
    };
  };

  static updateProfile = async ({ userId, ...bodyData }) => {
    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      removeUnderfinedObjectKey(bodyData),
      {
        new: true,
      }
    );
    if (!updateUser) throw new BadRequestError("Something went wrong");
    return updateUser;
  };

  // static updateExpertise = async ({ userId }, bodyData) => {
  //   const userExist = userModel.findById(userId).lean();

  //   if(!userExist?.expertise.includes())
  // };

  static changePass = async ({ userId, old_pw, new_pw }) => {
    const userExist = await userModel.findById(userId);

    const check = await bcrypt.compare(old_pw, userExist.password);
    if (!check) throw new BadRequestError("Password is incorrect");

    const hashNewPassword = await bcrypt.hash(new_pw, 10);
    userExist.password = hashNewPassword;
    await userExist.save();
    return 1;
  };

  static updateAvatar = async ({ userId, file }) => {
    console.log(userId, file);
    const userExists = await userModel.findById(userId);
    const avatarPath = `uploads/avatars/${file.filename}`;
    userExists.avatar = avatarPath;
    await userExists.save();
    return 1;
  };
}

module.exports = ProfileService;
