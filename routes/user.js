const express = require('express');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const router = express.Router();
const User = require('../models/user');


router.post("/signup", (req,res,next) => {
    console.log ('nvun');
    bcrypt.hash(req.body.Password,10)
    .then(hash => {
        const user = new User({
            Name : req.body.Name,
            Password :hash
        });    
    user.save()
    .then(result => {
        res.status(201).json({
            message : "user Created",
        });
    });
    });
});


    

router.post("/login" , (req,res,next) =>{
    let fetchedUser ;
    User.findOne({Name : req.body.Name})
        .then(user =>{
            if (!user){
                return res.status(404).json({
                    message : 'User not Found'
                });
            }
            fetchedUser = user ;
            return bcrypt.compare(req.body.Password , user.Password);
        })
        .then(result =>{
            if(!result){
                return res.status(401).json({
                    message : "Password Mismatch"
                });
            }
            const token = jwt.sign({name :fetchedUser.Name , userid : fetchedUser._id} , "hbvhbhjbhvvhebdfufierhuav" ,{expiresIn : "1h"});
            res.status(200).json({
                token : token,
                expiresIn : 3600,
                userid : fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message : "Authentication Failed"
        });
});
});


module.exports = router ;