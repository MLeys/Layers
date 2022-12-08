const Project = require("../models/project");

module.exports = {
    index,
    all,
    new: newProject,
    create,

};

async function create(req, res) {
    try {
        let userId = req.userId
        const newProject = await Project.create(req.body);
        newProject.userCreated = req.user;


        newProject.save(function() {});

        console.log('====================================');
        console.log(newProject);
        console.log('====================================');

        // add Project.findById? ***********


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