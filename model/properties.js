
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
    area: String,
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
    propertyImages:String
 });

  propertySchema.post("save", async function () {
    // changing user type to host on property registration
    if (this.isNew) {
        let owner = await User.findOne({ userID: this.userID }, { userType: 1 });
        if (owner.userType === "user") {
            owner.userType = "host";
            await owner.save();
        }
    }
});

propertySchema.pre("findOneAndDelete", async function (next) {
    console.log(this.propertyID);
    const property = await Property.findOne(this.getQuery());
    console.log(property.propertyID);
    try {
        await Booking.updateMany(
            { propertyID: property.propertyID },
            { $set: { propertyID: null } },
            (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Updated Booking:", docs);
                }
            }
        );
    } catch (error) {
        console.log("No bookings found");
    }

    try {
        await Review.updateMany(
            { propertyID: property.propertyID },
            { $set: { propertyID: null } },
            (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Updated reviews:", docs);
                }
            }
        );
    } catch (error) {
        console.log("No reviews found");
    }

    next();
});

const Property = mongoose.model("propertie", propertySchema);
module.exports=Property;