const mongoose = require('mongoose')

const volunteerSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    userName: String,
},{
    timestamps: true
})

module.exports = mongoose.model('Volunteer', volunteerSchema)