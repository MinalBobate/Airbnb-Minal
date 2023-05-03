const Review=require('../model/reviews')
// // handle reviews
// app.get("/review/:p", async function (req, res) {
//     try {

//         res.render("review", {});
//     } catch (error) {
//         res.send("Error");
//     }
// })

// app.post("/review/:p", async function (req, res) {
//     try {
//         let prpt = req.params.p;
//         let name = req.body.name;
//         let rating = req.body.starRating;
//         let review = req.body.review;
//         let reviewObj = {
//             userName: name,
//             starRating: rating,
//             reviewContet: review
//         }

//         Propertymodel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(prpt) }, { $push: { review: reviewObj } }, function (err, success) {
//             if (err) {
//                 let errorMessage = "Error submitting review";
//                 let redirectLink = "";
//                 let btnText = "Try again";
//                 res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
//             } else {
//                 res.render("success");
//             }
//         });

//     } catch (error) {
//         res.send("Error submitting review");
//     }
// })

module.exports={}