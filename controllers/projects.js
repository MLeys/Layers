const Project = require("../models/project");

module.exports = {
    index,
    all,
};

async function index(req, res) {
    try {
        const projectsDocs = await Project.find({}).exec();

        res.render('projects/projects', { projects: projectsDocs });
    } catch(err) {
        console.log('ERROR ---->ctrl.project.index')
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