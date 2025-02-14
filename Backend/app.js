const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const signUpRoute = require('./routes/sing.route');
const List= require('./routes/list.route')
const Event= require('./routes/Event.route')
const Contact = require('./routes/Contact.route')
const Job= require('./routes/Job.route')
// Load environment variables from .env file
dotenv.config();
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
// app.use(cors()); 

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, 'uploads/');
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Connect to MongoDB using mongoose
mongoose.connect('mongodb+srv://jeevansathi:123@cluster0.6wzqov2.mongodb.net/jeevansathi', {
  useNewUrlParser: true,          
  useUnifiedTopology: true

})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
  app.get('/', (req, res) => {
    res.send('hello')
  })
  app.post('/upload', upload.array('files', 10), (req, res) => {
  
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }
    return res.send('Files uploaded successfully.');
  });
app.use('/auth', signUpRoute); // Assuming the signup route is under '/auth'
app.use('/get_List',List)
app.use('/Event',Event)
app.use('/contact',Contact)
app.use('/job',Job)
// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Other routes or middleware can be added here
