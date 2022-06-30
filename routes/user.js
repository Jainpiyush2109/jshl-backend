const express = require('express');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const {registerUser} =require("../utilis/role-auth")


const router = express.Router();
const User = require('../models/user');


router.post("/signup", (req,res,next) => {
    registerUser(req.body,res);
});


    

router.post("/login" , (req,res,next) =>{
    let fetchedUser ;

    User.findOne({Number : req.body.Number} )
        .then(user =>{
            if (!user){
                return res.status(404).json({  
                    message : 'User not Found'
                });
            }
            fetchedUser = user ;
            // console.log(fetchedUser);
            return bcrypt.compare(req.body.Password , user.Password);
        })
        .then(result =>{
            if(!result){
                return res.status(401).json({
                    message : "Password Mismatch"
                });
            }
            const token = jwt.sign({Number :fetchedUser.Number , userid : fetchedUser._id , role : fetchedUser.Role} , "hbvhbhjbhvvhebdfufierhuav" ,{expiresIn : "1h"});
            res.status(200).json({
                token : token,
                expiresIn : 3600,
                userid : fetchedUser._id,
                role : fetchedUser.Role
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message : "Authentication Failed"
        });
});
});









module.exports = router ;