const express = require('express')
const router = express.Router();
const multer=require('multer')
router.use(express.json());//required for post request
router.use(express.urlencoded({ extended: false }));//for form data

const PropertyImages = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/PropertyImages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' 
      cb(null, uniqueSuffix+file.originalname )
    }
  })

  const PropertyImage = multer({ storage: PropertyImages })

const {registerProperty, particularProperty,registerPropertyPost}=require('../controllers/propertyController');

router.get("/registerProperty",registerProperty)
router.get("/particularProperty/:property_id", particularProperty)
router.post("/registerPropertyPost", PropertyImage.array('propertyImages'), registerPropertyPost)
module.exports = router;