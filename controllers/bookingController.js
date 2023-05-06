
const dotenv=require('dotenv')
dotenv.config()
const Booking=require('../model/bookings')

//user booking a property
const BookProperty=async (req,res)=>{
    try {
        var property_booked = req.params.property_id;
        let cookieName = req.cookies.mycookiename;
        let user = jwt.verify(cookieName, process.env.JWT_SECRET_KEY);
        Property.findOne({ _id: property_booked }, function (err, result) {
            if (err) {
                let errorMessage = "There was an error";
                let redirectLink = "myairbnb";
                let btnText = "My Airbnb";
                res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
            } else {
                let booking = new Booking({
                    GuestEmail: user.email,
                    propertyName: result.propertyName,
                    city: result.city,
                    state: result.state,
                    country: result.country,
                    checkinDate: req.body.checkInDate,
                    checkoutDate: req.body.checkoutDate,
                    numberOfRooms: req.body.numberOfRooms,
                    numberOfNights: req.body.numberOfNights,
                    numberOfGuests:req.body.numberOfGuests
                });
                booking.save();
            }
        });
        let redirectLink = "myBookings";
        let btnText = "My bookings";
        res.render("success", { redirectLink: redirectLink, btnText: btnText });
    } catch (err) {
        console.log(err,"error");
        res.send(err);
    }
}

// show user bookings
const MyBookedProperty=async (req,res)=>{
    try {
        let token = req.cookies.mycookiename;
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let userNamedb = await User.findOne({ email: user.email });
        Booking.find({ email: user.email }, function (err, result) {
            if (!err) {
                res.render("mybookings", { myBookings: result, user: userNamedb });
            }
        })
    } catch (error) {
       res.send(error);
    }
}




 // Cancel booking
 const cancleBooking=async (req,res)=>{
    try {
        let prop = req.query.cancelProperty;
        Booking.deleteOne({ _id: mongoose.Types.ObjectId(prop) }).then(function () {
            let redirectLink = "mybookings";
            let btnText = "My bookings";
            res.render("success", { redirectLink: redirectLink, btnText: btnText });
        }).catch(function (error) {
            let errorMessage = "Error cancelling booking";
            let redirectLink = "";
            let btnText = "Home";
            res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
        })
    } catch (error) {
        let errorMessage = "Error cancelling booking";
        let redirectLink = "mybookings";
        let btnText = "My bookimgs";
        res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
    }
}

module.exports={BookProperty,MyBookedProperty,cancleBooking}