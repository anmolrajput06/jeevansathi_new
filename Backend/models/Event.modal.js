const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  // STATUS 1
  Title: {
    type: String,
    // required: true,
  },
  descripation: {
    type: String,
    // required: true,
  },
  banner_image: {
    type: String
  },
  To_Date: {
    type: Date
  },
  from_date: {
    type: Date,
    default: null
  },
  person_name: {
    type: String,
    default: null

  },
  Contact: {
    type: Number,
    default: null

  }

});



const Event = mongoose.model('Event', eventSchema);

module.exports = { Event };
