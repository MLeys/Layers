const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new Schema({
    title: String,
    userCreated: {type: Schema.Types.ObjectId, ref: 'User'},  // Assign Team Lead
    type: String,  // team/ individual ect
    priority: String, // high/ low/ intermediate
    usersAssigned: [{type: Schema.Types.ObjectId, ref: 'User'}],
    rocks: [{type: Schema.Types.ObjectId, ref: 'Rock'}],
    // progress: {
    //     total: Number,
    //     rocks: {total: Number, 
    //         complete: Number,
    //         completion: Number} 
    //     },
    // complete: Boolean,
    
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Project', projectSchema);