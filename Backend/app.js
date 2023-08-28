const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const signUpRoute = require('./routes/sing.route');
const List= require('./routes/list.route')
// Load environment variables from .env file
dotenv.config();

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
if (!fs.existsSync('uploads/')) {
  fs.mkdirSync('uploads/');
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});
const upload = multer({ storage: storage });
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
app.use('/auth', signUpRoute); // Assuming the signup route is under '/auth'
app.get('/', (req, res) => {
  res.send('hello')
})
app.use('/get_List',List)
app.use(upload.single('image')); // Multer middleware for file upload

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Other routes or middleware can be added here
