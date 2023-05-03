const express = require('express')
const router = express.Router();
router.use(express.json());//required for post request
router.use(express.urlencoded({ extended: false }));//for form data

const {}=require('../controllers/bookingController')


module.exports = router;