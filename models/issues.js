const mongoose = require('mongoose');

const callSchema = mongoose.Schema({

    title : {
        type: String,
        required : true
    },
    address1: {
        type: String,
        // required : true
    },
    address2 :{
        type: String,
        // required : true
    },
    service_type:{
        type: String,
        // required :true
    },
    description:{
        type: String,
        required :true
    },
    name:{
        type: String,
        // required :true
    },
    Number:{
        type: Number,
        // required :true
    },
    Alternate_number:{
        type: Number
    },


},{
    timestamps : true
});

const Call = mongoose.model('call', callSchema);
module.exports = Call ;
