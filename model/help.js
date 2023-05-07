const mongoose=require('mongoose');

 const helpSchema = new mongoose.Schema({
  
    email: String,
    comment: String,
    name: String,
    contact: Number,
  });

const Help = mongoose.model("help", helpSchema);
module.exports=Help;
