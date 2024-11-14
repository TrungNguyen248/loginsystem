//test request

const express = require("express");
const { authentication } = require("../../middlewares/authUtils");
const asyncHandler = require("../../middlewares/asyncHandler");

const router = express.Router();
router.use(authentication);

router.get(
  "/",
  asyncHandler((req, res, next) => {
    res.json({ msg: "Get resource success" });
  })
);

module.exports = router;
