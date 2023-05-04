const User= require('../model/users');
const path = require('path');
const dotenv=require('dotenv');
dotenv.config();
const jwt=require('jsonwebtoken')

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
         profilePicture:path.join(__dirname + '/public/ProfileImages/' + req.file.filename),
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



 module.exports={
   signInGet, signUpGet, signInPost, signUpPost
}