
const jwt = require('jsonwebtoken');
const { User } = require('../models/User.model')
const { Intrested_user } = require('../models/IntrestedList.model')
async function List(req, res) {
  var authHeader = req.headers.authorization;
  if (authHeader) {
    try {

      const token = authHeader.substring(7);
      const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      // console.log('----', verified.gendar);
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
      // console.log(interested_id);
      const interest = new Intrested_user({
        user_id,
        intresed_id: interested_id,
      });
      // console.log(Intrested_user.intresed_id, 'intresed_id');
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
    // let hide =1
    const AllUser = await User.find({});
    // console.log(AllUser, 'AllUser');
    // console.log('AllUser',AllUser);

    res.status(200).json(AllUser);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ message: 'Server error' });
  }
}

async function get_particularUser(req, res) {
  console.log('user get api call');
  try {

    const { userId } = req.body
    // Fetch interests for the user
    const user = await User.findOne({ _id: userId });
    res.status(200).json(user);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ message: 'Server error' });
  }
}


async function hidestatusUpdate(req, res) {

  try {

    const { user_id, hide_status } = req.body

    // Check if the user exists based on the user_id from the token
    // const user = await User.findById(user_id);
    const user = await User.find({ _id: user_id });
    ;


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the hide_status for the user
    await User.findByIdAndUpdate(
      user_id, // User's unique ID to identify which user to update
      { hide: hide_status }, // New hide_status value
      { new: true } // To return the updated document
    );
    const user1 = await User.find({ _id: user_id });
    console.log(user1);
    return res.status(201).json({ message: 'Hide status updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(401).json({ message: 'Not authenticated' });
  }

};


async function oneUserDelete(req, res) {

    const { user_id } = req.body
    const user = await User.find({ _id: user_id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    try {
      const result = await User.deleteOne({ _id:user_id });

      if (result.deletedCount === 1) {
        console.log('User deleted successfully');
    return res.status(201).send({ message: 'User deleted successfully' });

      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }

}


module.exports = {
  List,
  interested,
  getInterests,
  getAllUser,
  get_particularUser,
  hidestatusUpdate,
  oneUserDelete
};

