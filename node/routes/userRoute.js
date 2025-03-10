const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware"); // Import Multer middleware


router.post("/register",userController.createUser);
router.post("/login",userController.verifyUser);
router.get("/dashboard",authMiddleware,userController.getDashboard);
router.post("/financial-insights", authMiddleware, userController.getFinancialInsights);
router.post("/upload", authMiddleware, upload.single("file"), userController.uploadFile);
router.post("/portalRecharge", authMiddleware, userController.portalRecharge);




module.exports = router;