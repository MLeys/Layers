
const Project = require("../models/project");
const Rock = require("../models/rock");

module.exports = {
  create,
};


async function create(req, res) {
    try {    
        const projectDoc = await Project.findById(req.params.id)
            .populate("userCreated")
            .populate("usersAssigned")
            .populate("rocks")
            .exec();
        req.body.userId = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        req.body.projectId = projectDoc._id;

        console.log(req.params, '++++++++++++++++++++ req.params')
        console.log(projectDoc._id, '---------------------projectdoc._id')
        
        const newRock = await Rock.create(req.body);

        const rockDoc = await Rock.findById(newRock._id)
            .populate("projectId")
            .populate("userId")
            .exec();
            rockDoc.save( function(err) {
                if (err) return res.send('projectDoc SAve Error rocks controller create');
                
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
            })        
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR <-- ctrl.rocks.create')
    }
}

