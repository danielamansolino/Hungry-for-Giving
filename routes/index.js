const express = require('express')
const router = express.Router()
const passport = require('passport')

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Hungry for Giving' })
})
/* GET About Us page. */
router.get('/about', function (req, res, next) {
	res.render('about', { title: 'About Us' })
})
/* GET Get Involved page. */
router.get('/get-involved', function (req, res, next) {
	res.render('get-involved', { title: 'Get Involved' })
})

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
	'/oauth2callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/',
	})
)

router.get('/logout', function (req, res) {
	req.logout(function () {
		res.redirect('/')
	})
})

module.exports = router
