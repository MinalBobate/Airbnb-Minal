const User= require('../model/users');
const path = require('path');
const dotenv=require('dotenv');
const express=require('express')
const cookieParser=require('cookie-parser')
const app=express()
dotenv.config();
const jwt=require('jsonwebtoken')
app.use(cookieParser());
const signUpGet=async(req,res)=>{  res.render("signUp" )}

const signInGet=async(req,res)=>{  res.render("signIn" )}

const signUpPost=async(req,res)=>{
  try {
   
    let user = new User({
        userType: req.body.userType,
        fName: req.body.firstName,
        mName: req.body.middleName,
        lName: req.body.lastName,
        gender: req.body.gender,
      
        contactNumber: req.body.contactNumber,
        profilePicture: req.file.filename,
        //profilePicture:path.join(__dirname + '/public/ProfileImages/' + req.file.filename),
        city: req.body.city,
        state:req.body.state,
        country: req.body.country,
        email: req.body.email,
        password: req.body.password
    });
    await user.save()
 

    res.redirect("/user/signIn")
} catch (err) {
  console.log(err,"error");
    res.send(err);
 
}
  
}

const signInPost=async(req,res)=>{
  try {
    const userName = req.body.username;
    const pwd = req.body.password;
    const userNamedb = await User.findOne({ email: userName });
 
    if (userNamedb.password === pwd) {
      const token = await jwt.sign({ "email": userNamedb.email }, process.env.JWT_SECRET_KEY);
   
      res.cookie("mycookiename", token, {
          expires: new Date(Date.now() + 1800000),
          httpOnly: true
      });
      res.redirect("/");
   }else {
    console.log("inside error");
    let errorMessage = "Invalid crentials or user does not exists";
    let redirectLink = "user/signIn";
    let btnText = "Try again";
    res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
}

} catch (err) {
let errorMessage = "Error Signin in";
let redirectLink = "login";
let btnText = "Try again";
res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
}

}


const myHostedProperties=async(req,res)=>{
  try {
      let token = req.cookies.mycookiename;
      let user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userNamedb = await User.findOne({ email: user.email });

      if (userNamedb.userType == 'host') {
          Property.find({ email: userNamedb.email }, function (err, result) {
              if (result.length) {
                  res.status(200).render("myHostedProperties", { user: userNamedb, hostProperties: result });
              } else {
                  let errorMessage = "No properties to show";
                  let redirectLink = "registerproperty";
                  let btnText = "Host a property";
                  res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
              }
          });
      } else {
          res.redirect("/");
      }
  } catch (err) {
      res.send("Error fetching hosted properties ");
  }
}
const myBookedProperties=async(req,res)=>{

 
    try {
        let token = req.cookies.jwt;
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let userNamedb = await User.findOne({ email: user.email });
        Booking.find({ email: user.email }, function (err, result) {
            if (!err) {
                res.render("myBookedProperties", { myBookings: result, user: userNamedb });
            }
        })
    } catch (error) {
       res.send(error);
    }


}


 module.exports={
   signInGet, signUpGet, signInPost, signUpPost,myHostedProperties,myBookedProperties
}