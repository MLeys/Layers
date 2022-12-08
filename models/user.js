const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    // address: String, 
    // headshot: String, // IMAGE
    // startDate: Date,
    // ADD ADDITIONAL WHEN READY FOR USER INFO
    // rocks: {total: Number, 
    //         complete: Number,
    //         completion: Number
    // }
    

  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);