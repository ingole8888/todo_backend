const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/dynamicSchoolController");

router.post("/upload-schools-data", schoolController.uploadSchoolsData);

module.exports = router;
