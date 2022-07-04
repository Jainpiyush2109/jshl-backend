const User =require("../models/user");
const bcrypt = require('bcrypt');
// const head = require ('../models/head');

const jwt = require('jsonwebtoken');
// const Head = require("../models/head");

const registerUser = async (userdetails,res) => {
    console.log(userdetails);
    
    bcrypt.hash(userdetails.Password,10)
    .then(hash => {
        const user = new User({
            UserId : userdetails.UserId,
            UserName : userdetails.UserName,
            Password :hash
            // Role : role

        });    
        console.log("user created");
    user.save()
    .then(result => {
        // console.log(result)
        return res.status(201).json({
            message : "user Created",
        });
    });
    });

}

// const validateNumber = async Number =>{
//     // console.log(Number)
//      const user = await User.findOne({Number : Number});
//     //  console.log(user);
//      return (user !== null);
// }

// const checkAdmin = async Number => {
//     return (Number == admin) ? true : false;
// }

const registerTechnician = async (details,res) => {
    console.log(details);

    bcrypt.hash(details.Password,10)
    .then(hash => {
        const user = new User({
            UserId : details.UserId,
            Password :hash,
            UserName : details.UserName,
            Role : details.Role,
            Department : details.Department

        });    

        console.log(user);
    user.save()
    .then(result => {
        // console.log(result)
        return res.status(201).json({
            message : "technician Created",
        });
    });
    });

}

module.exports =  {
    registerUser,
    registerTechnician
};