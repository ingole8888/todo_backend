const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/dynamicSchoolController");
const staticSchoolController = require("../controllers/schoolController");

router.post("/upload-schools-data", schoolController.uploadSchoolsData);
router.patch("/update-schools", staticSchoolController.staticSchoolData);

module.exports = router;
