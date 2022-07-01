const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    Number: {
        type : Number,
        required : true
        // unique : true
    },
    Password :{
        type : String ,
        required : true
    },
    EmployeeCode :{
        type : Number
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