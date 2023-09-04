const bcrypt = require('bcrypt');
const { Contact } = require("../models/Contact.modal")


async function ContactCreate(req, res) {
  try {

    const { Full_Name, Mobile_Number, Loking } = req.body;

    // Create an object to hold validation errors
    const errors = {};

    // Check if Full_Name is provided and is not empty
    if (!Full_Name || Full_Name.trim() === '') {
      errors.Full_Name = 'Full Name is required';
    }

    // Check if Mobile_Number is provided and is a valid phone number
    if (!Mobile_Number || !isValidPhoneNumber(Mobile_Number)) {
      errors.Mobile_Number = 'Valid Mobile Number is required';
    }

    // Check if Loking is provided and is not empty
    if (!Loking || Loking.trim() === '') {
      errors.Loking = 'Loking field is required';
    }

    // If there are validation errors, return a response with the errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
    const existingContact = await Contact.findOne({ Mobile_Number });

    if (existingContact) {
      return res.status(400).json({ message: 'Mobile Number already exists in the database' });
    }
    // If there are no validation errors, proceed to save the contact
    try {
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

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^[0-9]{10}$/; // Assumes a 10-digit numeric phone number
  return phoneRegex.test(phoneNumber);
}

module.exports = {
  ContactCreate, GetEvent, DeleteEvent
};
