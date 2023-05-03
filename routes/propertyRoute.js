const express = require('express')
const router = express.Router();
router.use(express.json());//required for post request
router.use(express.urlencoded({ extended: false }));//for form data


const {registerProperty, handleParticularProperty}=require('../controllers/propertyController');

router.get("/registerProperty",registerProperty)
router.get("particularProperty/:property_id", handleParticularProperty)

module.exports = router;