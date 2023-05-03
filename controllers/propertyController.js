const Property = require('../model/properties')


const registerProperty=async(req,res)=>{
   res.render('registerProperty');
}

const handleParticularProperty=async(req,res)=>{
    res.render('particularProperty');
 }

module.exports={
    registerProperty, handleParticularProperty
}
