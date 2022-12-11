
const Project = require("../models/project");
const Rock = require("../models/rock");

module.exports = {
  create,
  delete: deleteRock,
};

async function deleteRock(req, res) {
    try {
        console.log(req.params.id, '++++++++++++++++++++ req.params.id')
        console.log('DELETE ROUTE &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
        const rockDoc = await Rock.findByIdAndDelete(req.params.id);

        res.redirect(`/projects/${rockDoc.projectId}`)
    } catch(err) {
        console.log(err);
        res.send('TERMINAL ERROR ---> ctrl.projects.delete')
    }
}

async function create(req, res) {
    try {    
        const projectDoc = await Project.findById(req.params.id).exec();
            req.body.userId = req.user._id;
            req.body.userName = req.user.name;
            req.body.userAvatar = req.user.avatar;
            req.body.projectId = projectDoc._id;

        console.log(req.params.id, '++++++++++++++++++++ req.params.id')
        console.log(req.body._id, '---------------------req.body._id')
        
        const newRock = await Rock.create(req.body);

        const rockDoc = await Rock.findById(newRock._id)
            .populate("projectId")
            .populate("userId")
            .exec();
            projectDoc.rocks.push(rockDoc);
            Project.findById(req.params.id)
                .populate("userCreated")
                .populate("usersAssigned")
                .populate("rocks")
                .exec();

            projectDoc.save(function(err) {            

                res.redirect(`/projects/${ req.params.id }`);
                // res.redirect(`/projects/${ projectDoc.id }`);
            })    
            rockDoc.save( function(err) {
                if (err) return res.send('projectDoc SAve Error rocks controller create');
                
   
            })        
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR <-- ctrl.rocks.create')
    }
}

