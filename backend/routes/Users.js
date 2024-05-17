import express from 'express';
import { Login, Profile, Register, editUser,forgotPassword,resetPassword,userData, verifyOtp } from '../controllers/Users.js';
import multer from 'multer';

import path from 'path';
import { UserModel } from '../models/User_model.js';
const router = express.Router();

router.get("/:place_id", userData);
router.get("/profile/:userID", Profile);

router.post('/register',Register);
router.post("/login", Login);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword);

router.put("/edit-user/:userID", editUser);

const storageEngine = multer.diskStorage ({
    destination: './backend/public/uploads/users/',
    filename: function (req, file, callback) {
      callback (
        null,
        file.fieldname + '-' + Date.now () + path.extname (file.originalname)
      );
    },
  });

  // file filter for multer
const fileFilter = (req, file, callback) => {
  let pattern = /JPG|JPEG|PNG|SVG|jpg|jpeg|png|svg/; // reqex

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
// routing
router.put ('/update-avatar/:userID', upload.single ('avatar'), async (req, res) => {
    try {
        const userID = req.params.userID;
        const user = await UserModel.findById(userID);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Get the file id from the request
        const fileName = req.file.filename;
    
        // Update the user's avatarUrl field with the file id
        user.avatar = fileName;
        await user.save();
        res.json({ error:false, message:"Avatar updated!", avatar: fileName });
      } catch (error) {
        console.error('Error updating avatar:', error);
        res.status(400).json({ error:true, message:"Couldn't update!" });
      }
});


export {router as userRouter};