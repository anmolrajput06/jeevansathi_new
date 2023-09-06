const express = require('express');
const ContactController=require("../controllers/ContactController")
const router = express.Router();

router.post('/CreateContact', ContactController.ContactCreate);
router.get('/GetContact',ContactController.GetContact)
module.exports = router;
    