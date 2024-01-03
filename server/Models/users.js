const mong = require('mongoose');

const User = mong.model('User',{
    username: {
    type: String,
    required: [true, 'username:Username is required.'],
  },
  emailId: {
    type: String,
    required: [true, 'emailId:Email is required.'],
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: props => `emailId:Invalid email address.`,
    },
  },
  mobilenumber: {
    type: String,
    required: [true, 'mobilenumber:Mobile number is required.'],
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value); 
      },
      message: `mobilenumber:Invalid mobile number.`,
    },
  },
  password: {
    type: String,
    required: [true, 'password:Password is required.'],
  },
})

module.exports = User;