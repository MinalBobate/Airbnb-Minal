const mongoose=require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingID: { type: Number, required: true },
    bookingDate: Date,
    userID: { type: Number, required: true },
    propertyID: { type: Number, required: true },
    reviewStatus: Boolean,
    checkInDate: Date,
    checkOutDate: Date,
    totalPrice: Number,
    paymentMethod: String,
    numberOfRooms: Number,
    numberOfNights: Number,
    numberOfGuests: Number,
  });

  bookingSchema.pre("save", function (next) {
    // setting review status to false by default
    if (this.isNew) {
      this.reviewStatus = false;
    }
    next();
  });

const Booking = mongoose.model("booking", bookingSchema);
module.exports = Booking;
