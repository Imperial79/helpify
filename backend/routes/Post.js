import express from "express";
import { createPost,profilePost,allPosts,likePost,deletePost } from "../controllers/Posts.js";
import { PostModel } from "../models/Post_model.js";
import multer from 'multer';
import path from "path";
const router = express.Router();

router.get("/:place_id", allPosts);
router.delete("/:postID", deletePost);

router.get("/profile-post/:userID", profilePost);

const storageEngine = multer.diskStorage ({
    destination: './backend/public/uploads/posts/',
    filename: function (req, file, callback) {
      callback (
        null,
        file.fieldname + '-' + Date.now () + path.extname (file.originalname)
      );
    },
  });

  // file filter for multer
const fileFilter = (req, file, callback) => {
  let pattern = /JPG|JPEG|PNG|SVG|jpg|jpeg|png|svg/;

  if (pattern.test (path.extname (file.originalname))) {
    callback (null, true);
  } else {
    callback ('Error: not a valid file');
  }
};
// initialize multer
const upload = multer ({
  storage: storageEngine,
  fileFilter  
});
router.post("/create-post", upload.single ('image'), createPost);

router.put('/:postID/like',likePost);


export {router as postRouter};