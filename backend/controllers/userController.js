import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user/set token
// route    POST(request) /api/users/auth
// @access  Public (don't have to be log in to access route)
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne( { email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }

});

// @desc    Register a new user
// route    POST /api/users
// @access  Public 
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password} = req.body;

  const userExists = await User.findOne({email});

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public 
const logoutUser = asyncHandler(async (req, res) => {
  // destroy cookie
  res.cookie('jwt', '', {
    httpOnly: true,
    // expires right away
    expires: new Date(0)
  })
  
  res.status(200).json({ message: 'User logged out'})
});

// @desc    Get user profile
// route    POST /api/users/profile
// @access  Private (need to have valid json token)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  
  res.status(200).json(user)
});

// @desc    Update user profile
// route    PUT (updating) /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // get user by id
  const user = await User.findById(req.user._id);

  console.log(user)
  //check for user
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    // save user w/ new date
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    });
  } else {
    // user not there
    res.status(404);
    throw new Error('User not found')
  }
});


export { 
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
};