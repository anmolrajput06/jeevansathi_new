const express= require('express')
const router = express.Router()
const Job= require("../controllers/JobController")

router.post('/createJob',Job.Createjob)
module.exports=  router