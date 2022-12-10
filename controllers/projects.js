const Project = require("../models/project");
const Rock = require("../models/rock");

module.exports = {
    index,
    new: newProject,
    create,
    show,
    all,
    delete: deleteProject,
    unAssign,
    add: addAssigned,
    edit: editProject,
};
// console.log('===========================================');
// console.log('===========================================');
// console.log(req.params.id, ' <------- req.params.id')
// console.log('+++++++++++++++++++++++++++++++++++++++++++');
// console.log(req.body, ' <------- req.body')
// console.log('===========================================');
// console.log('===========================================');

async function editProject(req, res) {
    try {
        res.render('projects/edit');
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---> ctrl.projects.editProject')
    }
}

async function unAssign(req, res) {
    try {    
        console.log(req.params.id, ' ctrl.project.unAssign <----- req.params.id')
        const projectDoc = await Project.findById(req.params.id)
        .populate("userCreated")
        .populate("usersAssigned")
        .exec();
        console.log(projectDoc, '------------------------------- projectDoc ')
        projectDoc.usersAssigned.pop(req.user._id);
        console.log(projectDoc, '------------------------------- projectDoc2 ')


        projectDoc.save(function(err) {
            res.redirect(`/projects`);
        })           
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR <-- ctrl.projects.unAssign')
    }
}



async function deleteProject(req, res) {
    try {
        console.log(req.params.id, ' ctrl.project.deleteProject <----- req.params.id')

        const projectDoc = await Project.findByIdAndRemove(req.params.id)
            .populate("userCreated")
            .populate("usersAssigned")
            .populate("rocks")
            .exec();

        res.redirect('/projects/all');
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---> ctrl.projects.deleteProject')
    }
}


async function show(req, res) {
    try {
        console.log(req.params.id, '<-- req.params.id===ctrl.project.show')
        const projectDoc = await Project.findById(req.params.id)
            .populate("userCreated")
            .populate("usersAssigned")
            .populate("rocks")
            .exec();
        const rocksDocs = await Rock.find( {projectId: projectDoc});



        // console.log('===========================================');
        // console.log(rockDocs, ' <------- rocksDocs')
        // console.log('+++++++++++++++++++++++++++++++++++++++++++');

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
        console.log(req.params.id, '<-- req.params.id===ctrl.project.addAssigned')
        const projectDocs = await Project.find({});
        const projectDoc = await Project.findById(req.params.id)
            .populate("userCreated")
            .populate("usersAssigned")
            .populate("rocks")
            .exec();
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
        const projectDocs = await Project.find({});

        res.render('projects/projects', { projects: projectDocs });
       
    } catch(err) {
        console.log(err)
        console.log('TERMINAL ERROR ---->ctrl.project.index')
    }
}

async function create(req, res) {
    try {
        console.log('===========================================');
        console.log('===========================================');
        console.log(req.params.id, ' <------- req.params.id')
        console.log('+++++++++++++++++++++++++++++++++++++++++++');
        console.log(req.body, ' <------- req.body')
        req.body.userCreated = req.user._id;
        const newProject = await Project.create(req.body);

       
        
        newProject.save(function(err) {
            console.log('+++++++++++++++++++++++++++++++++++++++++++');
            console.log(newProject, ' <------- newProject')
            console.log('===========================================');
            console.log('===========================================');
            res.redirect('/projects/all')

        })            
        // res.redirect('/projects/all')

        
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
        const projectDocs = await Project.find({});
        const rockDocs = await Rock.find({});
        // const userProjectsDocs = projectsDocs.usersAssigned.includes(user);
        // console.log(projectsDocs.usersAssigned, '<======== user projects only ^^^^^^^')
        // console.log(req.user)

        res.render('projects/index', { 
            projects: projectDocs,
            rocks: rockDocs,
        });
       
    } catch(err) {
        console.log('TERMINAL ERROR ---->ctrl.project.index')
    }
}

async function all(req, res) {
    try {
        const projectDocs = await Project.find({});


        res.render('projects/projects', { projects: projectDocs});
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---> ctrl.projects.all')
    }
}