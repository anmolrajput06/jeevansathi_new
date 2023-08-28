

//   const mongoose = require('mongoose');

// const interestedSchema = new mongoose.Schema({
//   // STATUS 1
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     default: mongoose.Types.ObjectId,
//     index: true,
  
//   },
//   intresed_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     default: mongoose.Types.ObjectId,
//     index: true,
  
//   },

// });



// const Intrested_user = mongoose.model('Intrested_user', interestedSchema);

// module.exports = { Intrested_user };


const mongoose = require('mongoose');

const interestedSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  },
  intresed_id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  },
});

const Intrested_user = mongoose.model('Intrested_user', interestedSchema);

module.exports = { Intrested_user };
