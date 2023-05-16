const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
    user: {
        type: mongooseSchema.Types.ObjectId,
        ref: 'User',
        require: true
      },
      itemsDonated: {
        type: [String],
        require: true
      }
},{
    timestamps: true
})

module.exports = mongoose.model('Donation', donationSchema)