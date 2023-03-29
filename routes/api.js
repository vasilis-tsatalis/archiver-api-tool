const express = require("express");
const router = express.Router();

// const { received_files } = require("../src/endpoints/zipped_files");
const { received_files } = require("../src/endpoints/zipped_files");

// API Separate endpoints
// router.route("/metadata64").post(received_data);
router.route("/files64").post(received_files);


module.exports = router;