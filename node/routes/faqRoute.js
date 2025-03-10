const express = require("express");
const faqController = require("../controller/faqController");

const router = express.Router();

router.post("/faqHandler", faqController.handleFAQRequest);

module.exports = router;
