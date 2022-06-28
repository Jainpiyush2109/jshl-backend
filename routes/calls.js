const express = require('express');
const multer = require("multer");
const Call = require('../models/issues');

const router = express.Router();
const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'

}
const checkAuth = require('../middleware/check-auth');
const { createIndexes } = require('../models/issues');
const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
    const isvalid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime Type");
    if(isvalid){
      error = null;
    }
    cb(null , "./images");
  },
  filename:(req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null , name + '-' +Date.now() + '.' + ext);
  }
})


router.post("" , checkAuth, multer({storage:storage}).single("image"), (req,res,next) => {
  const url =req.protocol + '://' +req.get("host");
    const call = new Call({
      Category: req.body.Category ,
      Name:req.body.Name ,
      MobileNumber:req.body.MobileNumber ,
      Address1:req.body.Address1 ,
      Address2:req.body.Address2 , 
      SubCategory:req.body.SubCategory , 
      Description:req.body.Description ,
      ContactPerson:req.body.ContactPerson , 
      ContactNumber:req.body.ContactNumber,
      AlternateMobile : req.body.AlternateMobile,
      Slot : req.body.Slot,
      User : req.userData.userid  ,
      imagePath : url + "/images/" + req.file.filename 
    }
    
      ) ; 
    call.save().then(createdCall =>{
      res.status(201).json({
        message: 'Post added Successfully',
        call : {
          ...createdCall ,
          id : createdCall._id
        }
      });
    })
    
  
  });
  
  router.get("",(req,res,next) => {
      Call.find({User : req.userData.userid}).then(calls => {
        res.status(200).json({
          message : 'post fetched',
          calls : calls
        });
      });  
      
  });
  
  router.get("/:id" , (req,res,next) =>{
    Call.findById(req.params.id).then(call =>{
      if(call){
        res.status(200).json(call);
      }else{
        res.status(404).json({message : 'Call Not Found'})
      }
    })
  })
  
  router.put("/:id",multer({storage:storage}).single("image"),(req,res,next) => {
    // // let imagePath = req.body.imagePath;
    console.log(req.body);
    let imagePath;
    if(req.file){
      const url =req.protocol + '://' +req.get("host");
      imagePath = url + "/images/" + req.file.filename 
    }
    console.log(imagePath);
    const call = new Call({
      _id : req.body.id,
      Category: req.body.Category ,
      Name:req.body.Name ,
      MobileNumber:req.body.MobileNumber ,
      Address1:req.body.Address1 ,
      Address2:req.body.Address2 , 
      SubCategory:req.body.SubCategory , 
      Description:req.body.Description ,
      ContactPerson:req.body.ContactPerson , 
      ContactNumber:req.body.ContactNumber,
      AlternateMobile : req.body.AlternateMobile,
      Slot : req.body.Slot,
      User : req.body.User,
      imagePath : imagePath 
    }

       ) ;
        console.log(call);
        console.log("yash", call.User , " " ,req.body.User);
  
    Call.updateOne({_id : req.params.id ,User : req.userData.userid},call).then(result =>{ 
        res.status(200).json({
          message : 'Call Updated'
        });
      
    
    });
  });
  
  router.delete("/:id" ,checkAuth, (req,res,next) => {
    Call.deleteOne({_id : req.params.id , User : req.userData.userid}).then(result=>{
        res.status(200).json({
          message : 'Call Deleted'
        });
      
    });
    
  });

  module.exports = router;