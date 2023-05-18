const Event = require('../models/event')
const Donation = require('../models/donation')

function index(req, res, next) {
    Event.find({})
        .then(events => {
            res.render('events/index', {
                events,
                title: 'Events'
            })
        })
        .catch(next)
}

function newEvent(req, res) {
    res.render('events/new', {title: 'Host an Event' })
}

function create(req, res, next) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // remove any whitespace at start and end of cast
    req.body.itemsNeeded = req.body.itemsNeeded.trim();
    // split items into an array if it's not an empty string - using a regular expression as a separator
    if (req.body.itemsNeeded) req.body.itemsNeeded = req.body.itemsNeeded.split(/\s*,\s*/);
    Event.create(req.body)
		.then(() => res.redirect('/events'))
		.catch(next)
}

function show(req, res, next) {
    if (req.body.itemsNeeded) req.body.itemsNeeded = req.body.itemsNeeded.replace(/,/g, ', ')
    Event.findById(req.params.id).populate(['donation','volunteer'])
        .then(event => {
            console.log(event, 'show page')
            console.log('is the user also the owner?', req.user._id == event.user)
            console.log('req.user in show function controllers', req.user)
            return res.render('events/show', {
                title: 'Event Details',
                event,
                userId: req.user._id
            })
        })
        .catch((err) => {
            console.log(err, 'error getting to show page');
            res.redirect('/events');
    });
}

function updateEvent(req, res, next){
    Event.findById(req.params.id)
        .then(event => {  
            res.render('events/edit', {
                event,
                title: 'Event Edit'
            })
        })
}

function update(req, res, next){
    Event.findById(req.params.id)
        .then(event => {
            if(!event.user.equals(req.user._id)) throw new Error('Unauthorized, You do not have access to this content. Please click the back button to go back.')
            return event.updateOne(req.body)
        })
        .then(() => res.redirect(`/events/${req.params.id}`))
        .catch(next)
}

function deleteEvent(req, res, next) {
    Event.findById(req.params.id)
        .then(event => {
            if(!event.user.equals(req.user._id)) throw new Error('Unauthorized, You do not have access to this content. Please click the back button to go back.')
            return event.deleteOne()
        })
        .then(() => res.redirect('/events'))  
        .catch(next)  
}

module.exports = {
    index,
    newEvent,
    create,
    show,
    updateEvent,
    update,
    deleteEvent  
}