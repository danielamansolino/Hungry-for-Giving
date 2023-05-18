const Volunteer = require('../models/volunteer')
const Event = require('../models/event')

function newVolunteer(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    Event.findById(req.params.id)
        .then(event => {
            res.render('volunteer/new', {title: 'Volunteer Sign up', event}) 
        }).catch(err => {
            console.log('error in volunteer', err)

            res.send('error in volunteer check terminal')
    })
}

function addVolunteer(req, res, next) {
    req.body.event = req.params.id;
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    Volunteer.create(req.body)
        .then(volunteer => {
            console.log(volunteer)
            // now I need to find the event that this volunteer belongs to
            // then I need to add this volunteer ID to push it to the event donation array
            // then I need to save
            Event.findById(req.params.id)
                .then(event => {
                    console.log(event)
                    event.volunteer.push(volunteer._id)
                    return event.save()
                })   
            res.redirect(`/events/${req.params.id}`)// I do this last
        })
        .catch(next)
}

module.exports = {
    newVolunteer,
    addVolunteer
}
  