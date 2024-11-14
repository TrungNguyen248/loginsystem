"use strict";

const express = require("express");

const router = express.Router();

router.use("/v1/api", require("./access"));
router.use("/v1/api/resources", require("./resource"));

module.exports = router;
