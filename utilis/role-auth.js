const User =require("../models/user");
const bcrypt = require('bcrypt');
// const head = require ('../models/head');

const jwt = require('jsonwebtoken');
const Head = require("../models/head");

const registerUser = async (userdetails,res) => {
    console.log(userdetails);
    // const numberRegistered = await validateNumber(userdetails.Number);
    // console.log(numberRegistered);
    // if(numberRegistered){
    //     console.log("user exist");
    //     res.status(400).json({
    //         message : "Username already taken"

    //     });
    // }

    // let adminUser = await checkAdmin(userdetails.Number);
    // if(adminUser){
    //     role = "admin";
    // }else{
    //     role = "user";
    // }

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

    bcrypt.hash(details.password,10)
    .then(hash => {
        const head = new Head({
            UserId : details.UserId,
            Password :hash,
            Role : details.role,
            Department : details.department

        });    

        console.log(head);
    head.save()
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