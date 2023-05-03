const mongoose=require('mongoose');

 const contactUsSchema = new mongoose.Schema({
    contactID: { type: Number, required: true },
    userEmail: String,
    query: String,
    userName: String,
    userPhone: Number,
  });

const ContactUs = mongoose.model("contactuslist", contactUsSchema);
module.exports=ContactUs;