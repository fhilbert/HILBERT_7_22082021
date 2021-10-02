const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const isOwner = require("../middleware/isOwner");
// const isOwner = require("../middleware/isOwner.js");
const multer = require("../middleware/multer-config");

// comments

// checked routes
router.post("/comments/", postCtrl.createComment);
router.delete("/comments/:id", auth, postCtrl.deleteComment);
router.get("/comments/:id", postCtrl.getAllComments);

//-------------------------

// likes
// checked routes

router.get("/like/:id", postCtrl.getOneLike);
router.put("/like/:id", postCtrl.updateOneLike);
router.get("/likes/:id", postCtrl.getAllLikes); // all likes for a post
router.delete("/like/:id", postCtrl.deleteLike);
router.post("/like/", postCtrl.createLike);
//-------------------------

//
// ------- POSTS

// checked routes
router.post("/", auth, multer, postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.get("/", postCtrl.getAllPosts);
router.delete("/:id", auth, isOwner, postCtrl.deletePost);
//-------------------------

module.exports = router;
