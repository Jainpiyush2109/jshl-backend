const express = require('express');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { registerUser } = require("../utilis/role-auth");
const { registerTechnician } = require("../utilis/role-auth");



const router = express.Router();
const User = require('../models/user');


router.post("/signup", (req, res, next) => {
    User.findOne({ UserId: req.body.UserId })
        .then(user => {
            if (user) {
                return res.status(404).json({
                    message: 'User Already Exist'
                });
            } else {
                registerUser(req.body, res);
            }
        })

});
router.post("/addTechnician", (req, res, next) => {
    console.log(req.body);
    User.findOne({ UserId: req.body.UserId })
        .then(user => {
            if (user) {
                return res.status(404).json({
                    message: 'Head Already Exist'
                });
            }
        })
    registerTechnician(req.body, res);
});
router.get("/:Department", (req, res, next) => {
    // console.log(req.userData);
    User.find({ Department: req.params.Department, Role: "TECHNICIAN" }, { Password: 0 }).then(users => {
        res.status(200).json({
            message: 'post fetched',
            users: users
        });
    });


});



router.post("/login", async(req, res, next) => {
    let fetchedUser;
    console.log(req.body);
    const user = await User.findOne({ UserId: req.body.UserId })

    if(!user){
        return res.status(401).json({
            message : 'User Not Found'
        });
    }

    const passCheck = bcrypt.compare(req.body.Password, user.Password);

    if(!passCheck){
        return res.status(401).json({
            message: "Password Mismatch"
        });
    }
    const token = jwt.sign({ UserId: user.UserId, Id: user._id }, "hbvhbhjbhvvhebdfufierhuav", { expiresIn: "1h" });
            return res.status(200).json({
                token: token,
                expiresIn: 3600,
                user: user
            });

    // User.findOne({ UserId: req.body.UserId })
    //     .then(user => {
    //         console.log(user);
    //         console.log((user == null))
    //         if (user == null) {
    //             return res.status(401).json({
    //                 message: 'User not Found'
    //             });
                
    //         }
    //         fetchedUser = user;
    //         console.log(fetchedUser);
    //         console.log(req.body);
    //         console.log(bcrypt.compare(req.body.Password, user.Password))
    //         return bcrypt.compare(req.body.Password, user.Password);
        })
//         .then(result => {
//             console.log(result, "piyush")
//             if (!result) {
//                 return res.status(401).json({
//                     message: "Password Mismatch"
//                 });
//             }
//             const token = jwt.sign({ UserId: fetchedUser.UserId, Id: fetchedUser._id }, "hbvhbhjbhvvhebdfufierhuav", { expiresIn: "1h" });
//             res.status(200).json({
//                 token: token,
//                 expiresIn: 3600,
//                 user: fetchedUser
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             return res.status(401).json({
//                 message: "Authentication Failed"
//             });
//         });
// });









module.exports = router;