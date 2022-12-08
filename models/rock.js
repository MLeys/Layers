const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rockSchema = new Schema({
    title: String,
    description: String,
    category: String,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    
    priority: String, // high/ low/ intermediate
    // steps: [{type: Schema.Types.ObjectId, ref: 'Step'}],  // ADD LATER
    difficulty: {max: 10, min:1},
    progress: Number,
    complete: Boolean,
    
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Rock', rockSchema);