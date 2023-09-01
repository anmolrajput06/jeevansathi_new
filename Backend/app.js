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
app.use('/auth', signUpRoute); // Assuming the signup route is under '/auth'
app.use('/get_List',List)
app.use('/Event',Event)
// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Other routes or middleware can be added here
