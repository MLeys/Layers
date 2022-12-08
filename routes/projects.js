var express = require('express');
const { route } = require('.');
const app = require('../server');
var router = express.Router();
const projectCtrl = require('../controllers/projects');
const isLoggedIn = require('../config/auth')


router.get('/', isLoggedIn, projectCtrl.index);
router.get('/all', projectCtrl.all);
router.get('/new', isLoggedIn, projectCtrl.new);
router.post('/', isLoggedIn, projectCtrl.create);


module.exports = router;