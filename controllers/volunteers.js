const event = require('../models/event');
const Event = require('../models/event')
const Volunteer = require('../models/volunteer')

function create(req, res) {
    Event.findById(req.params.id)
    .then( event => {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    event.volunteer.push(req.body)
    return event.save()
    })
    .then (() => {
        res.redirect(`/event/${event._id}`)
    })
    .catch(err => {
        console.log(err)
    })

}





module.exports = create
// module.exports = { addVolunteer }
  