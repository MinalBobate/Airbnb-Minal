const express = require('express')
const dotenv=require('dotenv')

const router = express.Router();
dotenv.config()
router.use(express.json());//required for post request
router.use(express.urlencoded({ extended: false }));//for form data
//model
const Property = require('../model/properties')
const User = require('../model/users')
const Booking = require('../model/bookings')
const Reiview = require('../model/reviews')

// admin

router.get("/", function (req, res) {
    res.status(200).render("adminLogin");
})


router.post("/", async function (req, res) {
    try {
        let username = req.body.username;
        let pass = req.body.password;
        if (username == process.env.adminUsername && pass == process.env.adminPass) {
            res.redirect("/admin/dashboard");
        } else {
            let errorMessage = "There was an error";
            let redirectLink = "admin";
            let btnText = "Try again";
            res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
        }

    } catch (error) {
        let errorMessage = "Unexpected error occurred";
        let redirectLink = "admin";

        let btnText = "Try again";
        res.render("failure", { errorMessage: errorMessage, redirectLink: redirectLink, btnText: btnText });
    }
})

router.get("/dashboard", function (req, res) {
    res.render("admindashboard", {});
})

// manage users
router.get("/manageusers", async function (req, res) {
    try {
        User.find({}, function (err, doc) {
            if (!err) {
                res.render("manageusers", { users: doc });
            } else {
                res.send(err);
            }
        });

    } catch (error) {
        res.send(error);
    }
})

router.get("/manageproperties", async function (req, res) {
    try {
        Propertymodel.find({}, function (err, doc) {
            if (!err) {
                res.render("manageproperties", { properties: doc });
            } else {
                res.send(err);
            }
        });

    } catch (error) {
        res.send(error);
    }
})

router.get("/managebookings", async function (req, res) {
    try {
        Booking.find({}, function (err, doc) {
            if (!err) {
                res.render("managebookings", { bookings: doc });
            } else {
                res.send(err)
            }
        });

    } catch (error) {
        res.send(error)
    }
})

router.get("/customersupport", async function (req, res) {
    try {
        Help.find({}, function (err, doc) {
            if (!err) {
                res.render("managesupport", { queries: doc });
            } else {
                res.send(err);
            }
        });

    } catch (error) {
        res.send(error);
    }
})

router.get("/manageusers/:uid", function (req, res) {
    let delId = req.params.uid;
    User.deleteOne({ _id: mongoose.Types.ObjectId(delId) }).then(function () {
        res.redirect("/admin/manageusers");
    }).catch(function (error) {
        res.send(err);
    })
})

router.get("/manageproperties/:pid", function (req, res) {
    let delId = req.params.pid;
    Propertymodel.deleteOne({ _id: mongoose.Types.ObjectId(delId) }).then(function () {
        res.redirect("/admin/manageproperties");
    }).catch(function (error) {
        res.send(error);
    })
})

router.get("/managebookings/:bookedproperty", function (req, res) {
    let delId = req.params.bookedproperty;
    Booking.deleteOne({ _id: mongoose.Types.ObjectId(delId) }).then(function () {
        res.redirect("/admin/managebookings");
    }).catch(function (error) {
        res.send(error);
    })
})

router.get("/customersupport/:qid", function (req, res) {
    let delId = req.params.qid;
    Help.deleteOne({ _id: mongoose.Types.ObjectId(delId) }).then(function () {
        res.redirect("/admin/customersupport");
    }).catch(function (error) {
        res.send(error);
    })
})

module.exports=router