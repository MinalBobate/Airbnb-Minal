
const mongoose=require('mongoose');

 const propertySchema = new mongoose.Schema({
   
    propertyName: String,
    propertyType: String,
    owner: String,
    ownerImg: String,
    email:String,
    city: String,
    state: String,
    country: String,
    price: Number,
    area: Number,
    bedrooms: Number,
    beds:Number,
   
    maxGuests: Number,
   
     amenities: {
        gardenview:{
            type: Boolean,
            default: false
        },
        beachAccess:{
            type: Boolean,
            default: false
        },
        wifi:{
            type: Boolean,
            default: false
        },
        parking :{
            type: Boolean,
            default: false
        },
        pool: {
            type: Boolean,
            default: false
        },
        maountainview: {
            type: Boolean,
            default: false
        },
        kitchen: {
            type: Boolean,
            default: false
        },
        tv: {
            type: Boolean,
            default: false
        },
        petsAllowed: {
            type: Boolean,
            default: false
        },
        airconditioning: {
            type: Boolean,
            default: false
        },
        workspace: {
            type: Boolean,
            default: false
        },
        alarm: {
            type: Boolean,
            default: false
        }
     },
    description: String,
    review: [
        {
            userName: String,
            starRating: Number,
            reviewContent: String
        }
    ] ,
    propertyImages:[]
 });

  



const Property = mongoose.model("propertie", propertySchema);
module.exports=Property;