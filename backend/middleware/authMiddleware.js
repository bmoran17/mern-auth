import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// fucntion to protect routes so that you have to be logged in to access route
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // gets token/cookie
  token = req.cookies.jwt;

  // token exists
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // provides user w/ hashed password => added select string '-password' to not return it
      req.user = await User.findById(decoded.userId).select('-password');

      next();

    } catch (error) {
      // token is there, but not valid
      res.status(401);
      throw new Error('Not authorized, invalid token')
    }

    // no token exists => return 401 status (unauthorized) & error
  } else {
    res.status(401);
    throw new Error('Not authorized, no token')
  }
});

export { protect };