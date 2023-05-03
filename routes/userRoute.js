const express = require('express')
const router = express.Router();
const {signInGet,signUpGet,signInPost,signUpPost}=require('../controllers/userController')
const multer=require('multer')

const ProfileImages = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/ProfileImages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-'
      cb(null, uniqueSuffix + file.originalname )
    }
  })



  const PropertyImages = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/PropertyImages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' 
      cb(null, uniqueSuffix+file.originalname )
    }
  })

   const ProfileImage = multer({ storage: ProfileImages })
   const PropertyImage = multer({ storage: PropertyImages })

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/signIn',signInGet)
router.get('/signUp',signUpGet)
router.post('/signIn',signInPost)
router.post('/signUp',ProfileImage.single('profile'),signUpPost)



module.exports = router;