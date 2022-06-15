const express = require('express');

const router = express.Router();
const User = require('../models/user')

router.post("/signup", (req,res,next) => {
    console.log ('nvun')
    const user = new User({
        Name : req.body.Name,
        Password :req.body.Password
    });
    user.save();
    res.status(201).json({
        message : "user Created",
    });
})

module.exports = router;