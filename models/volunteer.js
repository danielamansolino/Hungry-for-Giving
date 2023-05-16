const mongoose = require('mongoose')

const volunteerSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
      },
    user: {
        type: mongooseSchema.Types.ObjectId,
        ref: 'User',
        require: true
      },
},{
    timestamps: true
})

module.exports = mongoose.model('Volunteer', volunteerSchema)