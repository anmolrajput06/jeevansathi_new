const express = require('express');
const EventController=require("../controllers/EventController")
const router = express.Router();

router.post('/CreateEvent', EventController.EventCreate);
router.get('/GetEvent',EventController.GetEvent)
module.exports = router;
    