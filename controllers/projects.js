const Project = require("../models/project");
const Rock = require("../models/rock");

module.exports = {
    index,
    all,
    new: newProject,
    create,
    add: addAssigned,
    show,
};


async function show(req, res) {
    try {
        console.log(req.params.id)
        const projectDoc = await Project.findById(req.params.id).populate("usersAssigned").exec();
        const rocksDocs = await Rock.find( {userId: projectDoc});


        console.log('===========================================');
        console.log(rocksDocs, ' <------- rocksDocs')
        console.log('+++++++++++++++++++++++++++++++++++++++++++');

        res.render('projects/show', { 
            project: projectDoc,
            rocks: rocksDocs
        });
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---> ctrl.projects.show')
    }
}


async function addAssigned(req, res) {
    try {        
        const projectsDocs = await Project.find({}).exec();
        const projectDoc = await Project.findById(req.params.id);
        projectDoc.usersAssigned.push(req.user.id);

        projectDoc.save(function(err) {
            res.redirect(`/projects/all`);
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
        console.log(err)
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
        // const userProjectsDocs = projectsDocs.usersAssigned.includes(user);
        console.log(projectsDocs.usersAssigned, '<======== user projects only ^^^^^^^')
        console.log(req.user)

        res.render('projects/index', { projects: projectsDocs });
       
    } catch(err) {
        console.log('TERMINAL ERROR ---->ctrl.project.index')
    }
}

async function all(req, res) {
    try {
        const projectsDocs = await Project.find({}).exec();


        res.render('projects/projects', { projects: projectsDocs});
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---> ctrl.projects.all')
    }
}