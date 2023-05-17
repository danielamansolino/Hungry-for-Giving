const Donation = require('../models/donation');
const event = require('../models/event');
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

// function deleteDonation(req, res, next) {
//     // req.body.user = req.user._id;
//     Donation.findById(req.params.id)
//         .then(donation => {
//             // if(!donation.user.equals(req.user._id)) throw new Error('Unauthorized')
//             return donation.deleteOne()
//         })
//         .then(() => res.redirect(`/events/${req.params.id}`)) 
//         .catch(next)  
// }

function deleteDonation(req, res, next) {
    // req.body.user = req.user._id;
    Event.findById(req.params.id)
        .then(event => {
            const donationIndex = event.donation.findIndex(findDonationsIndex)
            event.donation.splice(donationIndex, 1)
            event.save()
        })
        .then(() => res.redirect(`/events/${req.params.id}`)) 
        .catch(next)  
}

function findDonationsIndex(obj) {
    return obj._id.toString() === req.params.id

}

// function deleteDonation(req, res, next) {
//     // req.body.user = req.user._id;
//     Event.findById(req.params.eventId)
//     .then(event => {
//         // if (!battleTeam.user.equals(req.user._id)) throw new Error('Unauthorized')
//         event.donation.id(req.params.donationId).deleteOne()
//         return event.save()
//     })
//     .then(() => res.redirect(`/events/${req.params.eventId}`))
//     .catch(next)
// }

module.exports = {
    newDonation,
    addDonation,
    deleteDonation
  };