const Donation = require('../models/donation')
const Event = require('../models/event')

function newDonation(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    Event.findById(req.params.id)
        .then(event => {
            res.render('donations/new', {title: 'Add Donation', event}) 
        }).catch(err => {
            console.log('error in donation', err)

            res.send('error in donation check terminal')
    })
}

function addDonation(req, res, next) {
    req.body.event = req.params.id;
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    Donation.create(req.body)
        .then(donation => {
            console.log(donation)
            // now I need to find the event that this donation belongs to
            // then I need to add this donations ID to push it to the event donation array
            // then I need to save
            Event.findById(req.params.id)
                .then(event => {
                    console.log(event)
                    event.donation.push(donation._id)
                    return event.save()
                })   
            res.redirect(`/events/${req.params.id}`)// I do this last
        })
        .catch(next)
}

function deleteDonation(req, res, next) {
    Donation.findById(req.params.id)
        .then(donation => {
            return donation.deleteOne()
        })
        .then(() => res.redirect(`/events/${req.params.id}`)) 
        .catch(next)  
}

module.exports = {
    newDonation,
    addDonation,
    deleteDonation
  }