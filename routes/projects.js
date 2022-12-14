var express = require('express');
const app = require('../server');
var router = express.Router();
const projectsCtrl = require('../controllers/projects');
const isLoggedIn = require('../config/auth')

router.get('/new', isLoggedIn, projectsCtrl.new);
router.get('/', isLoggedIn, projectsCtrl.index);
router.post('/', isLoggedIn, projectsCtrl.create);


router.get('/:id/edit', isLoggedIn, projectsCtrl.edit);

router.put('/:id', isLoggedIn, projectsCtrl.update);


router.delete('/:id', isLoggedIn, projectsCtrl.delete);
router.post('/:id/unAssign', isLoggedIn, projectsCtrl.unAssign);

router.post('/:id', isLoggedIn, projectsCtrl.add); 

router.get('/all', isLoggedIn, projectsCtrl.all);
// addAssigned - add logged in user to prroject
router.get('/:id', isLoggedIn, projectsCtrl.show);


module.exports = router;