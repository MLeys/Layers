var express = require('express');
const { route } = require('.');
const app = require('../server');
var router = express.Router();
const projectCtrl = require('../controllers/projects');
const isLoggedIn = require('../config/auth')


router.get('/', isLoggedIn, projectCtrl.index);
router.get('/all', projectCtrl.all);
router.get('/:id', isLoggedIn, projectCtrl.show);
router.get('/new', isLoggedIn, projectCtrl.new);


router.post('/', isLoggedIn, projectCtrl.create);
// router.get('/:id/edit', isLoggedIn, projectCtrl.edit);
// router.put('/:id', isLoggedIn, projectCtrl.update);
// router.delete('/:id', isLoggedIn, projectCtrl.delete);



router.post('/:id', isLoggedIn, projectCtrl.add); 

// addAssigned - add logged in user to prroject


module.exports = router;