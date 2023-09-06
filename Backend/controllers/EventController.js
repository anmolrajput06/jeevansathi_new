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

async function getEventById(req, res) {
  console.log('user get api call');
  try {

    const { eventId } = req.body
    // Fetch interests for the user
    const event = await Event.findOne({ _id: eventId });
    res.status(200).json(event);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ message: 'Server error' });
  }
}

async function UpdateEvent(req, res) {
  try {


    // User ID from the URL
    const {
      Title,
      descripation,
      banner_image,
      To_Date,
      from_date,
      person_name,
      Contact
      ,
      eventId
    } = req.body; // Data to update
 
    // Check if the user exists
    const user = await Event.findById(eventId);
    console.log(user, '99999999999999999');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    await Event.findByIdAndUpdate(eventId, {
      Title,
      descripation,
      banner_image,
      To_Date,
      from_date,
      person_name,
      Contact
    });

    return res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
  }

}

module.exports = {
  EventCreate, GetEvent, DeleteEvent, getEventById, UpdateEvent
};
