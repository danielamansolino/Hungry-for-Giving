const express = require('express');
const router = express.Router();
const volunteersCtrl =require('../controllers/volunteers')

router.get('/events/:id/volunteer/new', volunteersCtrl.newVolunteer)
router.post('/events/:id/volunteer', volunteersCtrl.addVolunteer)

module.exports = router;