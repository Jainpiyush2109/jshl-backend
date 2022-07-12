const user = require('./models/user');
const mongoose = require('mongoose');
// const { head } = require('./models/head');
require('dotenv').config() ;
const bcrypt = require('bcrypt');
// console.log(process.env);
// let password ;


mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true})
  .then(()=> {
    console.log ('connected to database');
  })
  .catch((err)=>{
    console.log('connection failed', err);
  });

//   bcrypt.hash("123", 10, ).then(hash =>{
//     password = hash ;
//   })
const hash = bcrypt.hashSync("123", 10);

console.log(hash)

// mongoose.connect()
const admins = [
    new user ({
        UserId : 1111111111,
        UserName : "ElectricityAdmin",
        Password :hash,
        Department : "Electricity",
        Role : "admin"
    }),
    new user ({
        UserId : 2222222222,
        UserName : "PlumberAdmin",
        Password : hash,
        Department : "Plumber",
        Role : "admin"
    }),
    new user ({
        UserId : 3333333333,
        UserName : "CarpenterAdmin",
        Password : hash,
        Department : "carpenter",
        Role : "admin"
    })
]

var done =0 ;
for (var i=0; i<admins.length;i++){
    console.log(admins[i]);
    admins[i].save(function(err,result){
        console.log(result);
        done++;
        if(done === admins.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}
