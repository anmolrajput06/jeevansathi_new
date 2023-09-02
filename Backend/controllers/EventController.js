const bcrypt = require('bcrypt');
const { Event } = require("../models/Event.modal")
const jwt = require('jsonwebtoken');


async function EventCreate(req, res) {
  try {
    const {
      Title,
      descripation,
      banner_image,
      To_Date,
      from_date,
      person_name,
      Contact
    } = req.body;


    const newEvent = new Event({
      Title,
      descripation,
      banner_image,
      To_Date,
      from_date,
      person_name,
      Contact,
    });

    await newEvent.save();
    return res.status(201).json({ status: true, message: 'Added successfully.' });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'An error occurred.' });
  }
}

async function GetEvent(req, res) {
  try {
    const Allevent = await Event.find({});
    // console.log(Allevent, 'Allevent');
    res.status(200).json(Allevent);
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'An error occurred.' });
  }
}
async function DeleteEvent(req, res) {
  try {
    const eventId = req.body.id;
    const EventDelete = await Event.findByIdAndDelete(eventId)
    return res.status(204).send({ message: 'Event deleted successfully', "data": EventDelete });
  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  EventCreate, GetEvent, DeleteEvent
};
