"use strict";

const express = require("express");
const { authentication } = require("../../middlewares/authUtils");
const ProfileController = require("../../controllers/profile.controller");
const asyncHandle = require("../../middlewares/asyncHandler");

const UploadController = require("../../controllers/upload.controller");
const uploadMulter = require("../../services/upload.service");

const router = express.Router();
router.use(authentication);

router.post("/", asyncHandle(ProfileController.getProfileCtr));
router.patch("/update", asyncHandle(ProfileController.updateProfileCtr));
router.post(
  "/upload",
  uploadMulter.single("file"),
  ProfileController.updateAvatarCtr
);
router.post("/change-pwd", asyncHandle(ProfileController.changePwCtr));

module.exports = router;
