const mongoose = require('mongoose');

const bookingsSchema = mongoose.Schema({
    departure:String,
    arrival:String,
    time:Date,
    price:Number,
    duree:Date
});

const Booking = mongoose.model('bookings',bookingsSchema);

module.exports = Booking;