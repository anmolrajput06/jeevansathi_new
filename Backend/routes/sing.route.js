const express = require('express');
const authController = require('../controllers/authController');
const app=express()
const multer = require('multer');
const path = require('path');
const { validationResult, check } = require('express-validator');
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
const validationMiddleware = [
  check('candidates_name').notEmpty().withMessage('Candidate name is required'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  // Add more validation rules as needed
];  
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const extname = path.extname(file.originalname);
      cb(null, `${timestamp}${extname}`);
    },
  });
  
  const upload = multer({ storage: storage });
router.post('/register', upload.single('picture'),validationMiddleware, authController.signUp);
router.post('/login', authController.login);
router.post('/updateUser',authController.userUpdate)
module.exports = router;
