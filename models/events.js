const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    date: {
        type: Date
    }, 
    description: {
        type: String
    }, 
    posX: {
        type: Number
    }
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event