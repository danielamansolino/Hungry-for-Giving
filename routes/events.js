const express = require('express')
const router = express.Router()
const isLoggedIn = require("../config/auth")

const eventCtrl = require('../controllers/events')

//localhost:3000/events/
router.get('/', eventCtrl.index)
router.get('/new', isLoggedIn, eventCtrl.newEvent)
router.post('/', eventCtrl.create)

router.get('/:id', isLoggedIn, eventCtrl.show)
router.get('/:id/edit', isLoggedIn, eventCtrl.updateEvent)
router.put('/:id', eventCtrl.update)
router.delete('/:id', isLoggedIn, eventCtrl.deleteEvent)

module.exports = router