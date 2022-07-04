const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    UserId: {
        type : Number,
        required : true
        // unique : true
    },
    UserName: {
        type : String,
        required : true
    },
    Password :{
        type : String ,
        required : true
    },
    Department :{
        type : String,
        default : "Quarters"
    },
    Role : {
        type : String,
        default : "USER",
        required : true
    }
},{
    timestamps : true
});

const User = mongoose.model('user', userSchema);
module.exports = User ;