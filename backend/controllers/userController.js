import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Auth user/set token
// route    POST(request) /api/users/auth
// @access  Public (don't have to be log in to access route)
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Auth User'})
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public 
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Register User'})
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public 
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logout User'})
});

// @desc    Get user profile
// route    POST /api/users/profile
// @access  Private (need to have valid json token)
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User Profile'})
});

// @desc    Update user profile
// route    PUT (updating) /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Update User profile'})
});


export { 
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
};