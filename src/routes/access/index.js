"use strict";

const express = require("express");
const asyncHandler = require("../../middlewares/asyncHandler");
const accessController = require("../../controllers/access.controller");
const router = express.Router();

//register
router.post("/register", asyncHandler(accessController.registerCtr));
//login
router.post("/login", asyncHandler(accessController.loginCtr));

module.exports = router;
