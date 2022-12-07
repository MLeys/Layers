var express = require('express');
const { route } = require('.');
const app = require('../server');
var router = express.Router();
const projectCtrl = require('../controllers/projects');
const isLoggedIn = require('../config/auth')


router.get('/', isLoggedIn, projectCtrl.index);


module.exports = router;