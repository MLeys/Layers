const express = require('express')
const router = express.Router()
const rocksCtrl = require('../controllers/rocks');

router.post('/projects/:id/rocks', rocksCtrl.create)



module.exports = router;