const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    Full_Name: {
        type: String,
        default: null
    },
    Mobile_Number: {
        type: String,
        default: null
    },
    Loking: {
        type: String,

    }
});

const Contact = mongoose.model('contactSchema', contactSchema);

module.exports = { Contact };