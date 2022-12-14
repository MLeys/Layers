const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rockSchema = new Schema({
    title: String,
    description: String,
    category: {
      type: String,
      default: 'Project',
      enum:[ 'Team', 'Project', 'Personal', 'Base', 'Other', 'Activity']
    },  
    userId: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    userName: String,
    userAvatar: String,
    priority: {
      type: String,
      default: 'Normal',
      enum:[ 'Urgent', 'High', 'Normal', 'Low']
    },  
    
    // steps: [{type: Schema.Types.ObjectId, ref: 'Step'}],  // ADD LATER
    difficulty: {type: Number, max: 10, min:1, default: 5},
    progress: {type: Number, max: 10, min:0, default: 0},
    complete: {type: Boolean, default: false},
    projectId: {type: Schema.Types.ObjectId, ref: 'Project', autopopulate: true},
    userNote: {type: String, default: ''}
    
  }, {
    timestamps: true
  });
  
module.exports = mongoose.model('Rock', rockSchema);