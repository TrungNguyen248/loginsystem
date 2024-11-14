"use strict";

const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../middlewares/authUtils");
const { getInfoData } = require("../utils");
const {
  BadRequestError,
  AuthFailureError,
  NotFoundError,
} = require("../core/error.response");

class AccessService {
  /*
    1-Check email
    2-match password
    3-create AT vs RT and save
    4-generate tokens
    5-get data return login
  */
  static login = async ({ email, password }) => {
    //1
    const userExist = await userModel.findOne({ email });
    if (!userExist) throw new NotFoundError("Tài khoản chưa đăng kí.");
    //2
    const match = await bcrypt.compare(password, userExist.password);
    if (!match) throw new AuthFailureError("Mật khẩu không đúng.");

    //3-create AT vs RT and save
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");
    //4-generate tokens
    const tokens = await createTokenPair(
      {
        userId: userExist._id,
        email,
      },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      userId: userExist._id,
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
    });
    //update lastLogin time
    userExist.lastLogin = Date.now();
    await userExist.save();
    return {
      user: {
        ...getInfoData({
          fields: ["_id", "email", "fullName"],
          object: userExist,
        }),
      },
      tokens,
    };
  };

  static register = async ({ email, fullName, password }) => {
    //1: check email exists
    const userExist = await userModel.findOne({ email }).lean();
    if (userExist) {
      throw new BadRequestError("User already registered!");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      fullName,
      password: passwordHash,
    });
    // if (newUser) {
    //   const publicKey = crypto.randomBytes(64).toString("hex");
    //   const privateKey = crypto.randomBytes(64).toString("hex");

    ////console.log({ privateKey, publicKey })

    //save collection key
    // const keyStore = await KeyTokenService.createKeyToken({
    //   userId: newUser._id,
    //   publicKey,
    //   privateKey,
    // });

    // if (!keyStore) {
    //   throw new BadRequestError("Key store error");
    // }

    //created token pair
    // const tokens = await createTokenPair(
    //   {
    //     userId: newUser._id,
    //     email,
    //   },
    //   publicKey,
    //   privateKey
    // );

    return {
      user: {
        ...getInfoData({
          fields: ["_id", "email", "fullName", "role", "status", "lastLoginAt"],
          object: newUser,
        }),
      },
      //tokens,
    };
  };
}

module.exports = AccessService;
