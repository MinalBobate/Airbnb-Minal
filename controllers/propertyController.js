const jwt=require('jsonwebtoken')
const Property = require('../model/properties')


const registerProperty=async(req,res)=>{
   try {
        let user;
        let cookieName = req.cookies.mycookiename;
        if(cookieName){        
          user = jwt.verify(cookieName, process.env.JWT_SECRET_KEY)
        }else{
            res.redirect("/user/signIn");
        }
            
            if(user.userType=="guest"){
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
        console.log(req.body);
        let property = new Property({
         
            propertyName: req.body.propertyName,
            propertyType:req.body.propertyType,
            owner: req.body.owner,
            ownerImg:req.body.ownerImg,
             email: req.body.email,
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
            propertyImages:req.file.filename

        });

        await Property.save(function (err, success) {
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
        res.send(error);
    }

}




//get particular property
const particularProperty= async  (req, res) =>{
    try {
        var requestedPropertyId = req.params.property_id;
        var requestedProperty;
        var hostEmail;
        let userNamedb;

        let token = req.cookies.mycookiename;
        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
            if (!err) {
                User.findOne({ email: decoded.email }, function (err, result) {
                    if (!err) {
                        userNamedb = result;
                    }else{
                      
                    }
                });

                Property.findOne({ _id: mongoose.Types.ObjectId(requestedPropertyId) }, function (err, result) {
                    if (!err) {
                        requestedProperty = result;
                        hostEmail = requestedProperty.email;
                        User.findOne({ email: hostEmail }, function (err, doc) {
                            if (!err) {
                                res.render("property", { property: requestedProperty, hostProfile: doc, user: userNamedb });
                            }else{}
                        });
                    } else {
                        console.log(err);
                    }
                });
            }
        });
    } catch (error) {
        
        res.send(error);
    }
}

module.exports={
    registerProperty, particularProperty, registerPropertyPost
}
