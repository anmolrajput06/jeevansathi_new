const { Job } = require("../models/Job.modal")



async function Createjob(req, res) {

    const { Job_title,
        job_description,
        image,
        walkin_date_time,
        time_from_to,
        job_valid_date,
        qualification,
        experience,
        location,
        company_type
    } = req.body

    try {
        const newjob = new Job({
            Job_title,
            job_description,
            image,
            walkin_date_time,
            time_from_to,
            job_valid_date,
            qualification,
            experience,
            location,
            company_type
        })
        await newjob.save()
        return res.status(201).json({ status: true, message: 'Added successfully.' });

    } catch (err) {
        console.log(err, '000--------------------000');
        return res.status(500).json({ message: 'An error occurred.', 'error': err });
    }
}
module.exports = {
    Createjob
}