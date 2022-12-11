var express = require('express');
const app = require('../server');
var router = express.Router();
const projectsCtrl = require('../controllers/projects');
const isLoggedIn = require('../config/auth');
const rocksCtrl = require('../controllers/rocks');

router.post('/projects/:id/rocks', isLoggedIn, rocksCtrl.create);
router.delete('/rocks/:id', isLoggedIn, rocksCtrl.delete);




module.exports = router;