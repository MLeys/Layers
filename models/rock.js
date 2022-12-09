const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rockSchema = new Schema({
    title: String,
    description: String,
    category: String,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String,
    
    priority: String, // high/ low/ intermediate
    // steps: [{type: Schema.Types.ObjectId, ref: 'Step'}],  // ADD LATER
    difficulty: {type: Number, max: 10, min:1},
    progress: Number,
    complete: Boolean,
    projectId: {type: Schema.Types.ObjectId, ref: 'Project'},
    
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Rock', rockSchema);