const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
      },
      userName: String,
      itemsDonated: {
        type: [String],
        require: true
      }
},{
    timestamps: true
})

module.exports = mongoose.model('Donation', donationSchema)