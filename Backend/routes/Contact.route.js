const express = require('express');
const ContactController=require("../controllers/ContactController")
const router = express.Router();

router.post('/CreateContact', ContactController.ContactCreate);

module.exports = router;
    