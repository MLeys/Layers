const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
    name: String,
    employeeNum: Number,
    googleId: {
      type: String,
      required: true
    },
    address: String, 
    // headshot: String, // IMAGE
    // startDate: Date,

  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', employeeSchema);