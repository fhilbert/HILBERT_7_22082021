const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
// const isOwner = require("../middleware/isOwner.js");
const multer = require("../middleware/multer-config");

// router.post("/:id/like", auth, postCtrl.dealLike);

// router.put("/:id", auth, isOwner, multer, postCtrl.postCheck, postCtrl.modifyPost);
// router.get("/:id", auth, postCtrl.getOnePost);
// router.delete("/:id", auth, isOwner, postCtrl.postCheck, postCtrl.deletePost);
// router.get("/", auth, postCtrl.getAllPosts);

// comments

// checked routes
router.post("/comments/", auth, postCtrl.createComment);
// router.get("/comments/:id", postCtrl.getOneComment);
router.delete("/comments/:id", postCtrl.deleteComment);
router.get("/comments/:id", postCtrl.getAllComments);

//-------------------------

// likes
// checked routes

router.get("/like/:id", postCtrl.getOneLike);
router.get("/likes/:id", postCtrl.getAllLikes); // all likes for a post
// router.get("/dislikes/:id", postCtrl.getAllDislikes); // all dislikes for a post
router.delete("/likes/:id", postCtrl.deleteLike);
router.post("/like/", postCtrl.createLike);
//-------------------------

//
// ------- POSTS

// checked routes
router.post("/", auth, multer, postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.get("/", postCtrl.getAllPosts);
router.delete("/:id", auth, postCtrl.deletePost);
//-------------------------

module.exports = router;
