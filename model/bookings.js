const mongoose=require('mongoose');

const bookingSchema = new mongoose.Schema({
    
    GuestEmail:String,
    propertyName:String,
    checkInDate: Date,
    checkOutDate: Date,
    totalPrice: Number,
    paymentMethod: String,
    numberOfRooms: Number,
    numberOfNights: Number,
    numberOfGuests: Number,
  });



const Booking = mongoose.model("booking", bookingSchema);
module.exports = Booking;
