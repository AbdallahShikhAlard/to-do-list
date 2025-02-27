const mongoose = require('mongoose');  
const bcrypt = require('bcrypt');  

const UserSchema = new mongoose.Schema({  
  username: { type: String, required: true, unique: true },  
  password: { type: String, required: true }  
});  

// Hash the password before saving the user  
UserSchema.pre('save', async function(next) {  
  if (!this.isModified('password')) return next();  
  this.password = await bcrypt.hash(this.password, 10);  
  next();  
});  

// Method to compare password for authentication  
UserSchema.methods.comparePassword = function(password) {  
  return bcrypt.compare(password, this.password);  
};  

const User = mongoose.model('User', UserSchema);  
module.exports = User; 