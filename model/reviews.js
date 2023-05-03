
const mongoose=require('mongoose');

 const reviewSchema = new mongoose.Schema({
    reviewID: { type: Number, required: true },
    heading: String,
    userID: { type: Number, required: true },
    propertyID: { type: Number, required: true },
    bookingID: { type: Number, required: true },
    reviewerName: String,
    reviewerImg: String,
    reviewDate: Date,
    rating: Number,
    description: String,
  });
  
  
  

const Review = mongoose.model("review", reviewSchema);
module.exports=Review;