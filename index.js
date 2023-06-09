const ejs = require('ejs')
const express = require('express')
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const multer = require("multer")
const jwt = require('jsonwebtoken');
const cookieParser=require("cookie-parser")

const connection = require('./connection')

//model
const Property = require('./model/properties')
const User = require('./model/users')
const Booking = require('./model/bookings')
const Reiview = require('./model/reviews')
//routes
const userRoute = require("./routes/userRoute");
const propertyRoute = require("./routes/propertyRoute");
const bookingRoute = require("./routes/bookingRoute");
const reviewRoute = require("./routes/reviewRoute");
const adminRoute=require("./controllers/adminController")


//middlewares
app.use(express.static('public'));
app.use(express.json());//required for post request
app.use(express.urlencoded({ extended: false }));//for form data
app.use(cookieParser())

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))
dotenv.config();


app.get("/", async function (req, res) {
    try {
        
        let token = req.cookies.mycookiename;
        if(token){
            let user = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const userNamedb = await User.findOne({ email: user.email });
            console.log(userNamedb);
            if (userNamedb.userType == "guest") {
                isGuest = true;
            } else {
                isGuest = false;
            }
        }else{console.log("inside else")}
        console.log("outside if and else")
        let result=await Property.find({})
        console.log(result)
         res.render("home",{properties:result})
    } catch (error) {
        let errorMessage = "Error fetching properties";
        let redirectLink = "";
        let btnText = "Try again";
        res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
    }
})

app.get('/siteinstructions',async function(req,res){
   res.render("siteinstructions") 
})
app.get('/help',async function(req,res){
    res.render("help") 
 })
app.post("/help", function (req, res) {
    try {
        let supportQuery = new Help({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            help: req.body.comment
        })
        supportQuery.save();
        let redirectLink = "help";
        let btnText = "Go to help";
        res.render("success", { redirectLink: redirectLink, btnText: btnText });
    } catch (error) {
        let errorMessage = "There was an error";
        let redirectLink = "/help";
        let btnText = "Try again";
        res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
    }
})




app.use("/user", userRoute);
app.use("/property", propertyRoute);

app.use("/booking", bookingRoute);
app.use("/review", reviewRoute);
app.use('/admin',adminRoute)

app.listen(process.env.PORT, () => { console.log("server started at 8000") })

//???  app.listen(process.env.PORT,()=>{console.log(`server started at ${PORT}`);})   ????why error
