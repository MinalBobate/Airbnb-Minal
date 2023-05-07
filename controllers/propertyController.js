const jwt=require('jsonwebtoken')
const Property = require('../model/properties')
const User=require('../model/users')

const registerProperty=async(req,res)=>{
   try {
        let user;
        let userType;
        let cookieName = req.cookies.mycookiename;
        if(cookieName){        
          user = jwt.verify(cookieName, process.env.JWT_SECRET_KEY)
          userType=user.userType
        }else{
            res.redirect("/user/signIn");
        }
            
            if(userType=="guest"){
                    let filterEmail=user.email
                    //user.userType="host";
                    //await
                    await User.findOneAndUpdate({email:filterEmail},{userType:"host"},function(err,docs){
                        if(err){
                            console.log("error in updating usertype from guest to host while registering property");
                        }
                    })
                  
            }
           
            res.render("registerProperty")
            }catch (error) {
                console.log("error",error);
        res.send(error);
    }
}



const registerPropertyPost= async (req, res) =>{
    try {
        
        const filepaths=[];
        req.files.forEach(file => {
            filepaths.push(file.path)
        })
        console.log(filepaths);
        
        let user;
        let email;
        let cookieName = req.cookies.mycookiename;
        if(cookieName){        
          user = jwt.verify(cookieName, process.env.JWT_SECRET_KEY)
          email=user.email
        }
        let property = new Property({
         
            propertyName: req.body.propertyName,
            propertyType:req.body.propertyType,
            owner: req.body.owner,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            price: req.body.price,
            area: req.body.area,
            bedrooms: req.body.bedrooms,
            beds: req.body.beds,
            maxGuests: req.body.maxGuests,
           
            gardenview: req.body.gardenview,
            beachAccess: req.body.beachaccess,
            wifi: req.body.wifi,
            parking: req.body.parking,
            pool: req.body.pool,
            mountainview: req.body.mountainview,
            kitchen: req.body.kitchen,
            tv: req.body.tv,
            petsAllowed: req.body.pets,
            airconditioning: req.body.ac,
            workspace: req.body.workspace,
            alarm: req.body.alarm,

            description:req.body.description,
            propertyImages:filepaths,
            email:email
        });
        console.log(property);

        await property.save(function (err, success) {
            if (!err) {
                let redirectLink = "registerproperty";
                let btnText = "Add other property";
                res.render("success", { redirectLink: redirectLink, btnText: btnText });
            } else {
                let errorMessage = "Error registering property";
                let redirectLink = "propert/registerProperty";
                let btnText = "Try again";
                res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
            }
        });
        res.redirect("/")
    } catch (error) {
        
        res.status(400).send("error catch");
    }

}




//get particular property
const particularProperty= async  (req, res) =>{
    try {
        var requestedPropertyId = req.params.property_id;
        var requestedProperty;
        var hostEmail;
        let userNamedb;
        let user;

        let token = req.cookies.mycookiename;
        if(token){    
             user=await jwt.verify(token, process.env.JWT_SECRET_KEY)
             await User.findOne({ email: user.email }, function (err, result) {
                if (!err) {
                    userNamedb = result;
                }else{
                  userNamedb={}
                }
            });
            }

           
             
        await Property.findOne({ _id: mongoose.Types.ObjectId(requestedPropertyId) }, function (err, result) {
                    if (!err) {
                        requestedProperty = result;
                        hostEmail = requestedProperty.email;







                        User.findOne({ email: hostEmail }, function (err, doc) {
                            if (!err) {
                                res.render("particularProperty", { property: requestedProperty, hostProfile: doc, user: userNamedb });
                            }else{
                                console.log("host email not found in user database",err);
                            }
                        });
                    } else {
                        console.log(err,"property not found");
                    }
                });
            
        
    } catch (error) {
        
        res.send(error);
    }
}

module.exports={
    registerProperty, particularProperty, registerPropertyPost
}
