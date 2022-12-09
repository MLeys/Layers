
const Project = require("../models/project");
const Rock = require("../models/rock");

module.exports = {
  create,
//   delete: deleteReview
};

async function create(req, res) {
    try {        
        const projectDoc = await Project.findById(req.params.id);
        
        req.body.userId = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        req.body.projectId = projectDoc._id;
        
        const newRock = await Rock.create(req.body);
        console.log(newRock, '++++++++++++++++++++++++++++++ New Rock')

        projectDoc.save(function(err) {
            res.redirect(`/projects/${ req.params.id }`);
            // res.redirect(`/projects/${ projectDoc.id }`);
        })       
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR <-- ctrl.rocks.create')
    }
}

