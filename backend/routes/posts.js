const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
// const isOwner = require("../middleware/isOwner.js");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postCtrl.createPost);
// router.post("/", multer, postCtrl.createPost);
// router.post("/", auth, multer, postCtrl.postCheck, postCtrl.createPost);
// router.post("/:id/like", auth, postCtrl.dealLike);

// router.put("/:id", auth, isOwner, multer, postCtrl.postCheck, postCtrl.modifyPost);
// router.get("/:id", auth, postCtrl.getOnePost);
// router.delete("/:id", auth, isOwner, postCtrl.postCheck, postCtrl.deletePost);
// router.get("/", auth, postCtrl.getAllPosts);

// comments

// checked routes
router.post("/comments/", postCtrl.createComment);
router.get("/comments/:id", postCtrl.getOneComment);
router.delete("/comments/:id", postCtrl.deleteComment);
router.get("/comments/", postCtrl.getAllComments);

//-------------------------

// likes
// checked routes

router.get("/likes/:id", postCtrl.getOneLike);
router.get("/likes/", postCtrl.getAllLikes);
router.delete("/likes/:id", postCtrl.deleteLike);
router.post("/likes/", postCtrl.createLike);
//-------------------------

//
// ------- POSTS

// checked routes
// router.post("/", postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.get("/", postCtrl.getAllPosts);
router.delete("/:id", postCtrl.deletePost);
//-------------------------

module.exports = router;
