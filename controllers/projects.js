const Project = require("../models/project");
const Rock = require("../models/rock");
const User = require("../models/user");
const rocks = require("./rocks");

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
    update: saveEdit,
};



async function saveEdit(req, res) {
    try {
        console.log(req.params.id, ' <------- req.params.id in projects saveEdit')
        
        const projectDoc = await Project.findById(req.params.id);
        console.log(projectDoc, ' ************************** ORIGINAL GRABBED DOC')

        projectDoc.title = req.body.title;
        projectDoc.type = req.body.type;
        projectDoc.priority = req.body.priority;
        projectDoc.description = req.body.description;
        projectDoc.projectManager = req.body.manager;
        projectDoc.projectManagerName = req.body.manager.name;
        projectDoc.projectManagerAvatar = req.body.manager.avatar;
        projectDoc.userCreated = req.user._id;
        projectDoc.userCreatedName = req.user._id;
        projectDoc.userCreatedAvatar = req.user.avatar;

        console.log(req.body, ' REQ BODY =================');

        

        projectDoc.save(function(err) { // CHECK IF THIS CAN BE 'project'
                
            const project = Project.findById(projectDoc._id)
            .populate("userCreated")
            .populate("usersAssigned")
            .populate('projectManager')
            .populate("rocks")
            ;
            console.log(projectDoc, ' PROJECT DOC ============== SAVED')
            console.log(project, ' PROJEC ============== SAVED')
            res.redirect(`/projects/${projectDoc._id}`)
        })            
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---> ctrl.projects.create')
    }
}

async function editProject(req, res) {
    try {
        const projectTypes = [ 'Company', 'Team', 'Personal', 'Other'];
        const projectPriorities = [ 'Urgent', 'High', 'Normal', 'Low'];
        const projectDoc = await Project.findById(req.params.id)
            .populate("userCreated")
            .populate("usersAssigned")
            .populate('projectManager')
            .populate("rocks")
            .populate('type')
            .populate('priority')
            ;
            const userDocs = await User.find({});
        res.render('projects/edit', {
            project: projectDoc,
            projectTypes,
            projectPriorities,
            userDocs
        });
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
            .populate("rocks")
            .exec();
        projectDoc.usersAssigned.pop(req.user._id);

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
            console.log('test')

        res.redirect('/projects/all');
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---> ctrl.projects.deleteProject')
    }
}


async function show(req, res) {
    try {
        // console.log(req.params.id, '<-- req.params.id===ctrl.project.show')
        const projectDoc = await Project.findById(req.params.id)
            .populate("userCreated")
            .populate("usersAssigned")
            .populate('projectManager')
            .populate("rocks")
            .populate('type')
            .populate('priority')
        const rocksDocs = await Rock.find( {projectId: projectDoc})
        .populate('userId')
        .populate('projectId');

        // console.log(rocksDocs, ' ======== ROCKS DOCS')
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
        const projectDocs = await Project.find()
            .populate("userCreated")
            .populate("usersAssigned")
            .populate("rocks")
            .populate('projectManager');

        const projectDoc = await Project.findById(req.params.id)
            .populate("userCreated")
            .populate("usersAssigned")
            .populate("rocks")
            .populate('projectManager');
        projectDoc.usersAssigned.push(req.user.id);

        projectDoc.save(function(err) {
            res.redirect(`/projects/all`);
        })       
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---->ctrl.project.addUserToProject')
    }
}

// async function index(req, res) {
//     try {
//         const projectDocs = await Project.find({})


//         res.render('projects/projects', { projects: projectDocs });
       
//     } catch(err) {
//         console.log(err)
//         console.log('TERMINAL ERROR ---->ctrl.project.index')
//     }
// }

async function create(req, res) {
    try {
        req.body.userCreated = req.user._id;
        req.body.userCreatedName = req.user.name;
        req.body.userCreatedAvatar = req.user.avatar;
        req.body.projectManager = req.body.manager;
        req.body.projectManagerName = req.body.manager.name;
        req.body.projectManagerAvatar = req.body.manager.avatar;
        console.log(req.body, ' <-------- REQ BODY create projects ctrl')
        console.log(req.body.manager, ' <-------- REQ BODY PARAMS create projects ctrl')
        const newProject = await Project.create(req.body);
        const project = await Project.findById(newProject._id)
            .populate('usersAssigned')
            .populate('userCreated')
            .populate('projectManager')
            .populate('rocks');
        
        console.log(project.projectManager.name, '<---------projmanager name');
        project.save(function(err) {
            console.log(project, '<-------- PROJ SAVED0');
            res.redirect('/projects/all')
        })            
    } catch(err) {
        console.log(err);
        console.log('TERMINAL ERROR ---> ctrl.projects.create')
    }
}

async function newProject(req, res) {
    try {
        const projectTypes = [ 'Company', 'Team', 'Personal', 'Other'];
        const projectPriorities = [ 'Urgent', 'High', 'Normal', 'Low'];

        const rocksDocs = await Rock.find()
            .populate("userId")
            .populate("projectId");
            
        const  projectsDocs = await Project.find()
            .populate('usersAssigned')
            .populate('userCreated')
            .populate('rocks')
            .populate('projectManager');  
        
        const userDocs = await User.find({});
        res.render('projects/new', { 
            projects: projectsDocs,
            rocks: rocksDocs,
            userDocs,
            projectPriorities,
            projectTypes
        })
        
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