const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    // name: { type: String, required: true },
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
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
});

// UserSchema.plugin(uniqueValidator);
mongoose.model('User', UserSchema);