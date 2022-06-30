const User =require("../models/user");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const admin = "9996128627" ;
let role ;

const registerUser = async (userdetails,res) => {
    console.log(userdetails);
    const numberRegistered = await validateNumber(userdetails.Number);
    console.log(numberRegistered);
    if(numberRegistered){
        return res.status(400).json({
            message : "Username already taken"
        });
    }

    let adminUser = await checkAdmin(userdetails.Number);
    if(adminUser){
        role = "admin";
    }else{
        role = "user";
    }

    bcrypt.hash(userdetails.Password,10)
    .then(hash => {
        const user = new User({
            Number : userdetails.Number,
            Password :hash,
            Role : role

        });    
        
    user.save()
    .then(result => {
        // console.log(result)
        res.status(201).json({
            message : "user Created",
        });
    });
    });

}

const validateNumber = async Number =>{
    // console.log(Number)
     const user = await User.findOne({Number : Number});
     console.log(user);
     return (user !== null);
}

const checkAdmin = async Number => {
    return (Number == admin) ? true : false;
}

module.exports =  {
    registerUser
};