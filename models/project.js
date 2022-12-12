const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new Schema({
    title: String,
    description: String, // NEW ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    userCreated: {type: Schema.Types.ObjectId, ref: 'User'},  
    userCreatedName: String, // NEW ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    type: String,  
    priority: String, 
    usersAssigned: [{type: Schema.Types.ObjectId, ref: 'User'}],
    rocks: [{type: Schema.Types.ObjectId, ref: 'Rock'}],
    progress: {
        total: Number,
        rocks: {total: Number, 
            complete: Number,
            completion: Number} 
        },
    complete: Boolean,
    
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Project', projectSchema);