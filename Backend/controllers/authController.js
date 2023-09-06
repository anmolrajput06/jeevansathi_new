const bcrypt = require('bcrypt');
const { User, } = require('../models/User.model');
const jwt = require('jsonwebtoken');


async function signUp(req, res) {
  try {
    const {
      candidates_name,
      surname,
      email,
      number,
      work,
      gendar,
      loking,
      password,
      mother_name,
      father_name,
      gotra,
      father_occupation,
      mother_occupation,
      sister,
      brother,
      status_type,
      city,
      state,
      native_city,
      address,
      height,
      education,
      family_type,
      professional,
      physically_challenge,
      about_your_future_career,
      picture,
      status,
      active,
      hide
    } = req.body;
    if (status === "1") {
      const existingUser = await User.findOne({ $or: [{ candidates_name }, { email }] });
      console.log(existingUser, 'existingUser');
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email is already taken.' });
      }
      var profileCompletion = 0;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        candidates_name,
        surname,
        email,
        password: hashedPassword,
        number,
        work,
        gendar,
        loking,
        status: "1",
      });
      profileCompletion = profileCompletion + 1

      await newUser.save();
      return res.status(201).json({ status: true, message: 'Added successfully.', data: 1 });
    } else if (status === "2") {
      const myquery = { email: email };
      const newvalues = {
        $set: {
          mother_name,
          father_name,
          gotra,
          father_occupation,
          mother_occupation,
          sister,
          status_type,
          brother,
          status: "2",
          state,
          city,
          native_city,
          address,
        }
      };
      profileCompletion = profileCompletion + 1

      const updateResult = await User.updateOne(myquery, newvalues);
      console.log(updateResult.nModified + " document(s) updated");

      return res.status(201).json({ status: true, message: 'Updated successfully.', data: 2 });

    } else if (status === "3") {
      const myquery = { email: email };
      console.log(req.file); // Add this line
      const newvalues = {
        $set: {
          height,
          education,
          family_type,
          professional,
          physically_challenge,
          about_your_future_career,
          // picture,
          status: "3",
          active,
          hide,
        }
      };
      profileCompletion = profileCompletion + 1
      let responseMessage = '';
      const picture = req.file
      const aadharFront = req.file
      const adharBack = req.file
      const updateResult = await User.updateMany(myquery, newvalues);
      console.log(updateResult.nModified + " document(s) updated");
      if (profileCompletion === 0) {
        responseMessage = 'Profile incomplete'; // Set the response message for incomplete profile
      } else if (profileCompletion === 3) {
        responseMessage = 'Profile completed'; // Set the response message for completed profile
      } else {
        responseMessage = 'Profile incomplete'; // Set the response message for partially completed profile or any other intermediate state
      }

      return res.status(201).json({ status: true, message: responseMessage, data: status });
    } else {
      return res.status(400).json({ message: 'Invalid status.' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'An error occurred.' });
  }
}


async function login(req, res) {
  console.log('login hitt');
  try {
    const { email, password } = req.body;

    // Find user by email

    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ message: "user is not exist" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid || !user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }


    // Create and send JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, gendar: user.gendar }, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });

    res.status(200).json({ message: 'Login successful', token, user });

  } catch (error) {
    console.error('Error during login:', error);
    console.log(error, '-------');
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};
async function userUpdate(req, res) {
  try {
    const userId = req.params.id; // User ID from the URL
    const updateData = req.body; // Data to update

    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    await User.findByIdAndUpdate(userId, updateData);

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'An error occurred while updating user.' });
  }
}

module.exports = {
  signUp, login, userUpdate
};
