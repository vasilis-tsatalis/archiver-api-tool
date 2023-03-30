const express = require("express");
const router = express.Router();

const { default_page } = require("../src/endpoints/home");
const { received_files } = require("../src/endpoints/zipped_files");
const { received_directory } = require("../src/endpoints/zipped_directory");

// API Separate endpoints
router.route("/").get(default_page);
router.route("/files64").post(received_files);
router.route("/directory").post(received_directory);

module.exports = router;