const mongoose = require('mongoose')

const volunteerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    userName: String,
    message: {
      type: [String],
      required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Volunteer', volunteerSchema)