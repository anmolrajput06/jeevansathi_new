const express = require('express');
const authController = require('../controllers/authController');
const app=express()
const multer = require('multer');
const path = require('path');

const router = express.Router();
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const extname = path.extname(file.originalname);
      cb(null, `${timestamp}${extname}`);
    },
  });
  
  const upload = multer({ storage: storage });
router.post('/register', upload.single('picture'), authController.signUp);
router.post('/login', authController.login);
module.exports = router;
