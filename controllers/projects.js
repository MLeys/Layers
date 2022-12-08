const Project = require("../models/project");

module.exports = {
    index,
    all,
    new: newProject,
};

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
        res.render('projects/index');

    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---> ctrl.projects.all')
    }
}