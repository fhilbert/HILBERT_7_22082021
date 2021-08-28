const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
// const isOwner = require("../middleware/isOwner.js");
const multer = require("../middleware/multer-config");

router.post("/", postCtrl.createPost);
// router.post("/", auth, multer, postCtrl.postCheck, postCtrl.createPost);
// router.post("/:id/like", auth, postCtrl.dealLike);

// router.put("/:id", auth, isOwner, multer, postCtrl.postCheck, postCtrl.modifyPost);
router.get("/:id", postCtrl.getOnePost);
// router.get("/:id", auth, postCtrl.getOnePost);
router.delete("/:id", postCtrl.deletePost);
// router.delete("/:id", auth, isOwner, postCtrl.postCheck, postCtrl.deletePost);
router.get("/", postCtrl.getAllPosts);
// router.get("/", auth, postCtrl.getAllPosts);

router.get("/comments/:id", postCtrl.getOneComment);
router.get("/comments/", postCtrl.getAllComments);

router.get("/likes/:id", postCtrl.getOneLike);
router.get("/likes/", postCtrl.getAllLikes);

//

module.exports = router;
