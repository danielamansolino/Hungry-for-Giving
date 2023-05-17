const mongoose = require('mongoose')
const donationSchema = require('./donation')
const volunteer = require('./volunteer')

const eventSchema = new mongoose.Schema ({
  name: {
    type: String,
    require: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true

  },
  userName: String,
  userAvatar: String, 
  description: {
    type: String,
    require: true
},
  eventDate: {
    type: Date,
    require: true
},
  location: {
    type: String,
    require: true
},
  participans: Number,
  // itemsNeeded: [{name: String}],
  itemsNeeded: [String],
  donation: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'

  }],
  volunteer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer'

  }]
},{
    timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)