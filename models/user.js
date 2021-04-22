const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true},
    email: { type: String, required: true },
    hash: String,
    salt: String,
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
      },
      confirmationCode: { 
        type: String, 
        unique: true },
      resetPasswordToken: {
        type: String,
        required: false
      },
      resetPasswordExpires: {
        type: Date,
        required: false
      },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
}, {timestamps: true});



UserSchema.methods.generatePasswordReset = function(token) {
  
 
  this.resetPasswordToken = token
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

// UserSchema.plugin(uniqueValidator);
mongoose.model('User', UserSchema);