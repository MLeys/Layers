var express = require('express');
const app = require('../server');
var router = express.Router();
const projectsCtrl = require('../controllers/projects');
const isLoggedIn = require('../config/auth')


router.get('/', isLoggedIn, projectsCtrl.index);
router.get('/all', isLoggedIn, projectsCtrl.all);
router.get('/new', isLoggedIn, projectsCtrl.new);
router.get('/:id/edit', isLoggedIn, projectsCtrl.edit);
router.get('/:id', isLoggedIn, projectsCtrl.show);



router.put('/:id', isLoggedIn, projectsCtrl.saveEdit);
router.post('/', isLoggedIn, projectsCtrl.create);


// router.put('/:id', isLoggedIn, projectsCtrl.update);
router.delete('/:id', isLoggedIn, projectsCtrl.delete);
router.post('/:id/unAssign', isLoggedIn, projectsCtrl.unAssign);



router.post('/:id', isLoggedIn, projectsCtrl.add); 

// addAssigned - add logged in user to prroject


module.exports = router;