var express = require('express');
const { route } = require('.');
const app = require('../server');
var router = express.Router();
const projectCtrl = require('../controllers/projects');
const isLoggedIn = require('../config/auth')


router.get('/', isLoggedIn, projectCtrl.index);
router.get('/all', isLoggedIn, projectCtrl.all);
router.get('/new', isLoggedIn, projectCtrl.new);
router.get('/edit', isLoggedIn, projectCtrl.edit);
router.get('/:id', isLoggedIn, projectCtrl.show);




router.post('/', isLoggedIn, projectCtrl.create);


// router.put('/:id', isLoggedIn, projectCtrl.update);
router.delete('/:id', isLoggedIn, projectCtrl.delete);
router.post('/:id/unAssign', isLoggedIn, projectCtrl.unAssign);



router.post('/:id', isLoggedIn, projectCtrl.add); 

// addAssigned - add logged in user to prroject


module.exports = router;