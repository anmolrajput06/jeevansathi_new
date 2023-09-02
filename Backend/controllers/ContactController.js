const bcrypt = require('bcrypt');
const {Contact} = require("../models/Contact.modal")


async function ContactCreate(req, res) {
  try {
    const {
        Full_Name,
        Mobile_Number,
        Loking,
    
    } = req.body;


    const newContact = new Contact({
        Full_Name,
        Mobile_Number,
        Loking,
   
    });

    await newContact.save();
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
    ContactCreate, GetEvent, DeleteEvent
};
