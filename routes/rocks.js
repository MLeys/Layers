var express = require('express');
const app = require('../server');
var router = express.Router();
const projectsCtrl = require('../controllers/projects');
const isLoggedIn = require('../config/auth');
const rocksCtrl = require('../controllers/rocks');


router.get('/rocks/:id/edit', isLoggedIn, rocksCtrl.edit);
router.post('/projects/:id/rocks', isLoggedIn, rocksCtrl.create);
router.put('/rocks/:id', isLoggedIn, rocksCtrl.update);
router.delete('/rocks/:id', isLoggedIn, rocksCtrl.delete);




module.exports = router;