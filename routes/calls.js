const express = require('express');
const Call = require('../models/issues');

const router = express.Router();

router.post("" , (req,res,next) => {
    const call = new Call(req.body) ;
    call.save();
    console.log(call);
    res.status(201).json({
      message: 'Post added Successfully'
    });
  
  });
  
  router.get("",(req,res,next) => {
      Call.find().then(calls => {
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
  
  router.put("/:id",(req,res,next) => {
    
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
      ContactNumber:req.body.ContactNumber
        }) ;
        console.log(call);
  
    Call.updateOne({_id : req.params.id},call).then(result =>{
      console.log(result);
      res.status(200).json({message : "update Succesful"})
    });
  });
  
  router.delete("/:id" , (req,res,next) => {
    Call.deleteOne({_id : req.params.id}).then(result=>{
      console.log(result);
      res.status(200).json({
        message : 'Call Deleted'
      });
    });
    
  });

  module.exports = router;