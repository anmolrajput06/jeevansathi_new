const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.signUp);
router.post('/login', authController.login);
router.get('/List_get',authController.List)
module.exports = router;
