const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const isUser = require("../middleware/isUser");

const multer = require("../middleware/multer-config");

router.post("/signup", userCtrl.userCheck, userCtrl.signup);
router.post("/login", userCtrl.userCheck, userCtrl.login);

router.get("/profile", auth, userCtrl.getAllProfiles);
router.get("/profile/:id", auth, userCtrl.getOneProfile);
router.put("/profile/:id", auth, multer, userCtrl.modifyProfile);
router.delete("/profile/:id", auth, userCtrl.deleteProfile);

module.exports = router;
