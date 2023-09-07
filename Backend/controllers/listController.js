
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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

  try {
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

}
async function getInterests(req, res) {
  try {
    const user = req.body
    const interests = await Intrested_user.find({ user_id: user.user });

    // Extract the intresed_id values from the interests
    const intresedIds = interests.map((interest) => interest.intresed_id);

    // Use aggregation to join data from "user" collection
    const joinedData = await User.aggregate([
      {
        $match: {
          _id: { $in: intresedIds.map((id) => new mongoose.Types.ObjectId(id)) },

        },
      },
    ]);

    res.status(200).json(joinedData);
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

    const user = await User.find({ _id: user_id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
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

async function activestatusUpdate(req, res) {
  try {
    const { user_id, active_status } = req.body;

    // Check if user_id and active_status are provided
    console.log(user_id, active_status);
    // if (!user_id || !active_status) {
    //   return res.status(400).json({ message: 'Both user_id and active_status are required' });
    // }
    // Check if active_status is a valid boolean value
    if (typeof active_status !== 'boolean') {
      return res.status(400).json({ message: 'active_status must be a boolean value' });
    }

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndUpdate(
      user_id,
      { active: active_status },
      { new: true }
    );

    const updatedUser = await User.findById(user_id);

    return res.status(201).json({ message: 'Status updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error:', error);
    return res.status(401).json({ message: 'Not authenticated' });
  }
}

async function oneUserDelete(req, res) {

  const { user_id } = req.body
  const user = await User.find({ _id: user_id });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    const result = await User.deleteOne({ _id: user_id });

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

async function remove_interested_user(req, res) {
  try {
    const { user_id, remove_interested_id } = req.body;

    const removedInterest = await Intrested_user.findOneAndRemove({
      user_id,
      intresed_id: remove_interested_id,
    });

    if (!removedInterest) {
      return res.status(404).json({ message: 'Interest not found' });
    }

    res.status(200).json({ message: 'Interest user removed successfully' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function get_block_unblock(req, res) {
  var authHeader = req.headers.authorization;
  if (authHeader) {
    try {

      const token = authHeader.substring(7);
      const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      console.log('----', verified.userId);
      const active_status = await User.find({ _id: verified.userId })
      console.log(active_status[0].active);
      res.send(active_status)

    } catch (error) {
      console.log('Error :', error);
      res.status(401).send({ massage: 'Not authenticated' });
    }
  } else {
    // No token provided
    res.status(401).send({ massage: 'Not authenticated' });
  }
}
module.exports = {
  List,
  interested,
  getInterests,
  getAllUser,
  get_particularUser,
  hidestatusUpdate,
  oneUserDelete,
  activestatusUpdate,
  remove_interested_user,
  get_block_unblock
};

