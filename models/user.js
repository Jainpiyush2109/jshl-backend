const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    Name: {
        type : String,
        required : true
    },
    Password :{
        type : String ,
        required : true
    },
    EmployeeCode :{
        type : Number
    }
},{
    timestamps : true
});

const User = mongoose.model('user', userSchema);
module.exports = User ;