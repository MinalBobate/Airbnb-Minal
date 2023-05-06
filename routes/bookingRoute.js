const express = require('express')
const router = express.Router();
router.use(express.json());//required for post request
router.use(express.urlencoded({ extended: false }));//for form data

const {BookProperty,MyBookedProperty,cancleBooking}=require('../controllers/bookingController')
router.post('/BookProperty',BookProperty)
router.get('/MyBookedProperty',MyBookedProperty)
router.post('/cancleBooking',cancleBooking)
module.exports = router;