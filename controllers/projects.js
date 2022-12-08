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
        console.log('===========================================');
        console.log('+++++++++++++++++++++++++++++++++++++++++++');
        console.log(req.params.id, ' <=== req.params.id')
        console.log('===========================================');
        console.log('+++++++++++++++++++++++++++++++++++++++++++');
        console.log(req.body, ' <-- req.body') // EMPTY

        console.log(req.userId, ' <-- req.userId')
        
        const projectsDocs = await Project.find({}).exec();
        console.log(projectsDocs, ' <-- projectsDocs')
        // const projectsDocs = await Project.find({}).exec();
        const projectDoc = await Project.findById(req.params.id);
            console.log(projectDoc, ' <-- projectDoc')
            projectDoc.usersAssigned.push(req.user.id);
            
            console.log('===========================================');
            console.log(projectDoc, ' <------- projectDoc')
            console.log('+++++++++++++++++++++++++++++++++++++++++++');
            
            // _id: new ObjectId("6391613fe3f52ed1617e577e"),
            projectDoc.save(function(err) {
                console.log('===========================================');
                console.log(projectDoc, ' <------- projectDoc2')
                console.log('+++++++++++++++++++++++++++++++++++++++++++');
                res.redirect(`/projects/all`);

                // res.render('projects/all', {project: projectDoc})
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
        // const userProjectsDocs = projectsDocs.usersAssigned.includes(user);
        console.log(projectsDocs.usersAssigned, '<======== user projects only ^^^^^^^')
        console.log(req.user)

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