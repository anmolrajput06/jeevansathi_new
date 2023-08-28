
const jwt = require('jsonwebtoken');
const { User } = require('../models/User.model')
const { Intrested_user } = require('../models/IntrestedList.model')
async function List(req, res) {
  var authHeader = req.headers.authorization;
  if (authHeader) {
    try {

      const token = authHeader.substring(7);
      const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      console.log('----', verified.gendar);
      if (verified.gendar == "male") {
        const female = await User.find({ gendar: 'female' })
        res.send(female)
      }
      else if (verified.gendar == "female") {
        const male = await User.find({ gendar: 'male' })
        res.send(male)
      }

    } catch (error) {
      console.log('Error :', error);
      res.status(401).send({ massage: 'Not authenticated' });
    }
  } else {
    // No token provided
    res.status(401).send({ massage: 'Not authenticated' });
  }
};
async function interested(req, res) {
  var authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.substring(7);
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const { user_id, interested_id } = req.body;
      console.log(interested_id);
      const interest = new Intrested_user({
        user_id,
        intresed_id: interested_id,
      });
      console.log(Intrested_user.intresed_id, 'intresed_id');
      const savedInterest = await interest.save();
      // if(userId==verified.userId)
      res.status(201).json(savedInterest);
    } catch (error) {
      console.log('Error :', error);
      res.status(401).send({ massage: 'Not authenticated' });
    }
  } else {
    // No token provided
    res.status(401).send({ massage: 'Not authenticated' });
  }
}
async function getInterests(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: 'Not authenticated' });
    }

    const token = authHeader.substring(7);
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch interests for the user
    const interests = await Intrested_user.find({ user_id: verified.user_id });

    res.status(200).json(interests);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ message: 'Server error' });
  }
}

async function getAllUser(req, res) {
  try {
  
    const AllUser = await User.find({  });
    console.log(AllUser, 'AllUser');
    res.status(200).json(AllUser);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ message: 'Server error' });
  }
}
module.exports = {
  List,
  interested,
  getInterests,
  getAllUser
};
