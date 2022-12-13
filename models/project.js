const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new Schema({
    title: String,
    description: String, // NEW ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    userCreated: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},  
    userCreatedName: String, // NEW ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    userCreatedAvatar: String,
    projectManager: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true}, 
    projectManagerName: String,
    projectManagerAvatar: String,
    type: {
      type: String,
      default: 'Team',
      enum:[ 'Company', 'Team', 'Personal', 'Other']
    },  
    priority: {
      type: String,
      default: 'Normal',
      enum:[ 'Urgent', 'High', 'Normal', 'Low']
    },  
    usersAssigned: [{type: Schema.Types.ObjectId, ref: 'User', autopopulate: true}],
    usersAssignedName: String,
    usersAssignedAvatar: String,
    
    rocks: [{type: Schema.Types.ObjectId, ref: 'Rock', autopopulate: true}],
    // progress: {
    //     total: Number,
    //     rocks: {total: Number, 
    //         complete: Number,
    //         completion: Number} 
    //     },
    complete: Boolean,
    
  }, {
    timestamps: true
  });
  

module.exports = mongoose.model('Project', projectSchema);