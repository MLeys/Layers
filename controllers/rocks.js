
const Project = require("../models/project");

module.exports = {
  create,
//   delete: deleteReview
};

async function create(req, res) {
    try {        
        const projectsDocs = await Project.find({});
        const projectDoc = await Project.findById(req.params.id);

        console.log(req.body, '========= REQ BODY')


        projectDoc.rocks.push(req.body);
        projectDoc.save(function(err) {
            res.redirect(`/projects/${ req.params.id }`);
            // res.redirect(`/projects/${ projectDoc.id }`);
        })       
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR <-- ctrl.rocks.create')
    }
}

