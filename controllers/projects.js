const Project = require("../models/project");

module.exports = {
    index,
};

async function index(req, res) {
    try {


        res.render('projects/index')
    } catch(err) {
        console.log('ERROR ---->ctrl.project.index')
    }
}