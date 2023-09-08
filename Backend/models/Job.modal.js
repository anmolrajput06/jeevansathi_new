const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    // STATUS 1
    Job_title: {
        type: String,
        // required: true,
    },
    job_description: {
        type: String,
        // required: true,
    },
    image: {
        type: String,

    },
    walkin_date_time: {
        type: Date
    },
    time_from_to: {
        type: Date,

    },
  
    job_valid_date: {
        type: Date,

    },
    qualification: {
        type: String,
        default: null

    },
    // STATUS 2
    experience: {
        type: String,
        default: null

    },
    location: {
        type: String,
        default: null

    },
    company_type: {
        type: String,
        default: null

    },



});



const Job = mongoose.model('Job', jobSchema);

module.exports = { Job };
