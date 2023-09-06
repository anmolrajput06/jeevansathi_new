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

    },
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

const Contact = mongoose.model('contactSchema', contactSchema);

module.exports = { Contact };