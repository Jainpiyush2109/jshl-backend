const express = require('express');
const router = express.Router();
// const head = require('../models/head');
const { registerTechnician } = require('../utilis/role-auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');



// router.post("/addTechnician",checkAuth, (req,res,next) => {
//     console.log(req.body);
//     head.findOne({userid : req.body.userid} )
//         .then(head =>{
//             if(head){
//                 return res.status(404).json({  
//                     message : 'head Already Exist'
//                 });
//             }
//         })
//     registerTechnician(req.body,res);
// });

// router.post("/login" , (req,res,next) =>{
//     let fetchedHead ;

//     console.log(req.body);
//     head.findOne({userid : req.body.id} )
//         .then(head =>{
//             if (!head){
//                 return res.status(404).json({  
//                     message : 'head not Found'
//                 });
//             }
//             fetchedHead = head ;
//             console.log(fetchedHead);
//             return bcrypt.compare(req.body.password , head.password);
//         })
//         .then(result =>{
//             if(!result){
//                 return res.status(401).json({
//                     message : "Password Mismatch"
//                 });
//             }
//             const token = jwt.sign({userid :fetchedHead.userid , id : fetchedHead._id } , "hbvhbhjbhvvhebdfufierhuav" ,
//             {expiresIn : "1h"});
//             res.status(200).json({
//                 token : token,
//                 expiresIn : 3600,
//                 id : fetchedHead._id,
//                 role : fetchedHead.role,
//                 department : fetchedHead.department
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             return res.status(401).json({
//                 message : "Authentication Failed"
//         });
// });
// });

// module.exports = router;