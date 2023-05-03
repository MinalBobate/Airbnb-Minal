const User= require('../model/users');

const signUpGet=async(req,res)=>{  res.render("signUp" )}

const signInGet=async(req,res)=>{  res.render("signIn" )}

const signUpPost=async(req,res)=>{
  try {
   console.log(req.body);
    let user = new User({
        userType: req.body.userType,
        fName: req.body.firstName,
        MName: req.body.MiddleName,
        lName: req.body.lastName,
        gender: req.body.gender,
      
        contactNumber: req.body.contactNumber,
        profilePicture:req.body.profile.filename,
        city: req.body.city,
        state:req.body.state,
        country: req.body.country,
        email: email,
        password: req.body.password
    });

    await user.save()
} catch (err) {
    res.send(err);
}
  
}

const signInPost=async(req,res)=>{

}




 module.exports={
   signInGet, signUpGet, signInPost, signUpPost
}