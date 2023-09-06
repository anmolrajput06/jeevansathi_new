const express = require('express');
const EventController=require("../controllers/EventController")
const router = express.Router();

router.post('/CreateEvent', EventController.EventCreate);
router.get('/GetEvent',EventController.GetEvent)
router.post('/DeleteEvent',EventController.DeleteEvent)
router.post('/getEventById', EventController.getEventById)
router.post('/eventUpdate',EventController.UpdateEvent)
module.exports = router;
    