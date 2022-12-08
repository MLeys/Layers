const Project = require("../models/project");

module.exports = {
    index,
    all,
    new: newProject,
    create,
    add: addAssigned,
};

async function addAssigned(req, res) {
    try {
        // const projectsDocs = await Project.find({}).exec();
        const projectDoc = await Project.findByIdAndUpdate(req.params.id, function(err, projectDoc) {
            projectDoc.usersAssigned.push(req.body);

            projectDoc.save(function(err) {
                // res.redirect(`/projects/${projectDoc}`);
                console.log('===========================================');
                console.log('+++++++++++++++++++++++++++++++++++++++++++');
                console.log(projectDoc)
                console.log('===========================================');
                console.log('+++++++++++++++++++++++++++++++++++++++++++');
                res.render('projects/all', {project: projectDoc})
            })       
        })

    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---->ctrl.project.addUserToProject')
    }
}

async function index(req, res) {
    try {
        const projectsDocs = await Project.find({}).exec();

        res.render('projects/projects', { projects: projectsDocs });
       
    } catch(err) {
        console.log('TERMINAL ERROR ---->ctrl.project.index')
    }
}

async function create(req, res) {
    try {
        let userId = req.userId
        const newProject = await Project.create(req.body);

        newProject.userCreated = req.user;
        newProject.save(function() {});

        res.redirect('/projects/all')
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---> ctrl.projects.create')
    }
}

async function newProject(req, res) {
    try {

        res.render('projects/new');
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---> ctrl.projects.new')
    }
}

async function index(req, res) {
    try {
        const projectsDocs = await Project.find({}).exec();

        res.render('projects/projects', { projects: projectsDocs });
       
    } catch(err) {
        console.log('TERMINAL ERROR ---->ctrl.project.index')
    }
}

async function all(req, res) {
    try {
        const projectsDocs = await Project.find({}).exec();


        res.render('projects/index', { projects: projectsDocs});
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---> ctrl.projects.all')
    }
}