const Booking=require('../model/bookings')
// // Show bookings
// app.get("/mybookings", async function (req, res) {
//     try {
//         let token = req.cookies.jwt;
//         const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         let userNamedb = await User.findOne({ email: user.email });
//         Booking.find({ email: user.email }, function (err, result) {
//             if (!err) {
//                 res.render("mybookings", { myBookings: result, user: userNamedb });
//             }
//         })
//     } catch (error) {
//        res.send(error);
//     }
// })

// // app.post("/mybookings", async function (req, res) {
// //     try {
// //         var property_booked = req.body.propertyBooked;
// //         const name = req.cookies.jwt;
// //         const property = await Propertymodel.findOne({ _id: mongoose.Types.ObjectId(property_booked) }, function (err, result) {
// //             if (err) {
// //                 res.send(err)
// //             } else {
// //                 console.log(result);
// //             }
// //         })

// //         let booking = new Booking({
// //             bookedProperty: property_booked,
// //             checkinDate: req.body.checkin,
// //             checkoutDate: req.body.checkout,
// //             nights: req.body.nights,
// //             guests: req.body.noOfGuests
// //         });
// //         await booking.save();
// //         let redirectLink = "mybookings";
// //         let btnText = "My bookings";
// //         res.render("success", { redirectLink: redirectLink, btnText: btnText });
// //     } catch (err) {
// //         res.send(err);
// //     }
// // })

// // Cancel booking
// app.get("/deletebooking", async function (req, res) {
//     try {
//         let prop = req.query.cancelProperty;
//         Booking.deleteOne({ _id: mongoose.Types.ObjectId(prop) }).then(function () {
//             let redirectLink = "mybookings";
//             let btnText = "My bookings";
//             res.render("success", { redirectLink: redirectLink, btnText: btnText });
//         }).catch(function (error) {
//             let errorMessage = "Error cancelling booking";
//             let redirectLink = "";
//             let btnText = "Home";
//             res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
//         })
//     } catch (error) {
//         let errorMessage = "Error cancelling booking";
//         let redirectLink = "mybookings";
//         let btnText = "My bookimgs";
//         res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
//     }
// })

module.exports={}