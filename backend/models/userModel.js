import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

// before we save run this function
// this => user we saving
userSchema.pre('save', async function(next) {
  // password not change in any way => move on
  if (!this.isModified('password')) {
    next();
  }

  // if passwordd if modified => hash it
  // salt is a key used to hash password
  // genSalt method => generate salt, takes # of rounds/characters
  const salt = await bcrypt.genSalt(10);
  //plain text password = hash password before saving it to database
  this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  // returns true if both match if not false
  return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;