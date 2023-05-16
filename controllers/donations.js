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
            res.redirect(`/events/${req.params.id}`)
        })
        .then(event => {
            console.log(event)
            event.donation.push(req.body)
            return event.save()
        })
    
        .catch(next)
}

// function addDonation(req, res, next) {
//     req.body.event = req.params.id;
//     req.body.user = req.user._id;
//     req.body.userName = req.user.name;
    
//     Event.findById(req.params.eventId)
//     .then(event => {
//         console.log(event)
//         event.donation.push(req.body)
//         return event.save()
//     })
//     .then(() => res.redirect(`/events/${req.params.eventId}`))
//     .catch(next)
// }





// function create(req, res) {
//     Event.findById(req.params.id)
//         .then(event => {
//             event.donations.push(req.body);
//             return event.save()
//             .then(event => {
//                 res.redirect(`/events/${event._id}`);
//             }).catch((err) => {
//                 console.log(err);
//                 res.status(500).send('Error: ' + err);
//             });
//         }).catch((err) => {
//             console.log(err);
//             res.status(500).send('Error: ' + err);
//           });
// }




// function create(req, res) {
//     req.body.event = req.params.id
//     console.log('req.body in event create \n', req.body)
//     // then we send the req.body to a model method to create
//     Donation.create(req.body)
//         .then(donation => {
//             console.log( donation)

//             res.redirect(`/events/${req.params.id}`)
//         })
//         // handle any errors if they occur
//         .catch(err => {
//             console.log('error in newTicket', err)

//             res.send('error in new ticket check terminal')
//         })
// }


       
// }
// // Add a pokemon to the battleTeam
// // CREATE - CRUD
// function addPokemonToTeam(req, res, next) {
//     // query for a team to add the pokemon to 
//     // push my pokemon document into the pokemon field
//     // save my pokemon document in the pokemon field 
//     // redirect to the battle team that I found and updated
//     BattleTeam.findById(req.params.battleId)
//     .then(battleTeam => {
//         // { name: 'user value' }
//         console.log(battleTeam)
//         battleTeam.pokemon.push(req.body)
//         return battleTeam.save()
//     })
//     .then(() => res.redirect(`/battle-teams/${req.params.battleId}`))
//     .catch(next)
// }
module.exports = {
    newDonation,
    addDonation,
  };