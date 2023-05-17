const express = require('express');
const router = express.Router();
const donationsCtrl =require('../controllers/donations')

router.get('/events/:id/donations/new', donationsCtrl.newDonation)
router.post('/events/:id/donations', donationsCtrl.addDonation);
router.delete('/donations/:id', donationsCtrl.deleteDonation)

module.exports = router;