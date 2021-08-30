const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

// router.post("/signup", userCtrl.signup);
router.post("/signup", userCtrl.userCheck, userCtrl.signup);
router.post("/login", userCtrl.userCheck, userCtrl.login);

router.get("/user", auth);
// router.get("/user", userCtrl.userCheck, userCtrl.getUser);
// router.get("/:id", userCtrl.userCheck, userCtrl.getUser);
// router.put("/update", userCtrl.userCheck, userCtrl.updateUser);
// router.delete("/:id", userCtrl.userCheck, userCtrl.deleteUser);

module.exports = router;
