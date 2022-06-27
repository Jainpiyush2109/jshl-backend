const mongoose = require('mongoose');

const callSchema = mongoose.Schema({

    Category : {
        type: String,
        required : true
    },
    Name: {
        type: String,
        required : true
    },
    MobileNumber : {
        type: String,
        required : true
    },
    Address1: {
        type: String,
        // required : true
    },
    Address2 :{
        type: String,
        // required : true
    },
    SubCategory:{
        type: String,
        // required :true
    },
    Description:{
        type: String,
        required :true
    },
    ContactPerson:{
        type: String,
        required :true
    },
    ContactNumber:{
        type: Number,
        required :true
    },
    AlternateMobile:{
        type: Number
    },
    Slot:{
        type:String,
        required : true 
    },
    User :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
        // required : true
    },
    imagePath : {
        type : String 
    }


},{
    timestamps : true
});

const Call = mongoose.model('call', callSchema);
module.exports = Call ;
