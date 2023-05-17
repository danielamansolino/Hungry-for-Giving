const Event = require('../models/event')
const Donation = require('../models/donation')

// READ -Index
// get all of the current signed in users Events  
function index(req, res, next) {
    // In battle teams there is a field called 'user' I want to serch to find the user that I am passinf in 
//    Event.find({ user: req.user._id })
    Event.find({})
        // () => {}
        .then(events => {
            // this res.render will be looking for a view to render => from this app check the views folder
            // inside the views folder there is a folder call battle-teams 
            // inside of that folder there is a file called index
            res.render('events/index', {
                events,
                title: 'Events'
            })

        })
        // If something goes wrong pass it to the error handler
        .catch(next)
}

function newEvent(req, res) {
    // req.session.lastPage = '/events/new'
    res.render('events/new', {title: 'Host an Event' })
}

// CREATE acction- CRUD
function create(req, res, next) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    
    // remove any whitespace at start and end of cast
  req.body.itemsNeeded = req.body.itemsNeeded.trim();
  // split cast into an array if it's not an empty string - using a regular expression as a separator
  if (req.body.itemsNeeded) req.body.itemsNeeded = req.body.itemsNeeded.split(/\s*,\s*/);
    // from the session 'req.user._id' I would like the 'req.bode' to have the current singed in user
    // incomming info and session info
    // {name: 'some value', user: 'object is value' } 
    Event.create(req.body)
		.then(() => res.redirect('/events'))
		.catch(next)
}


function show(req, res, next) {
    if (req.body.itemsNeeded) req.body.itemsNeeded = req.body.itemsNeeded.replace(/,/g, ', ')
    Event.findById(req.params.id).populate(['donation','volunteer'])
        .then(event => {
            console.log(event, 'show page')
            return res.render('events/show', {
                title: 'Event Details',
                event
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
            if(!event.user.equals(req.user._id)) throw new Error('Unauthorized')
            return event.updateOne(req.body)
            // return event.updateOneAndUpdate(req.body)
        })
        .then(() => res.redirect(`/events/${req.params.id}`))
        .catch(next)
}

function deleteEvent(req, res, next) {
    Event.findById(req.params.id)
        .then(event => {
            if(!event.user.equals(req.user._id)) throw new Error('Unauthorized')
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