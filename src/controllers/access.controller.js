"use strict";

const AccessService = require("../services/access.service");
const { CREATED, SuccessResponse } = require("../core/success.response");

class AccessController {
  registerCtr = async (req, res, next) => {
    new CREATED({
      message: "Registered Successfully",
      metadata: await AccessService.register(req.body),
    }).send(res);
  };

  loginCtr = async (req, res, next) => {
    new SuccessResponse({
      message: "Login successfully",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
