require('dotenv').config() ;
const express = require("express");
const path = require('path')
const cors = require('cors')
// const Call = require('./models/issues');
const mongoose = require('mongoose');

const app = express();
const userRoutes = require('./routes/user');
const callsRoutes = require('./routes/calls');
const adminRoutes = require('./routes/head');
const checkAuth = require('./middleware/check-auth');

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true})
  .then(()=> {
    console.log ('connected to database');
  })
  .catch((err)=>{
    console.log('connection failed', err);
  })

  app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  
    res.header("Access-Control-Allow-Headers", "Authorization");
    
    next();
    
    });

app.use(express.json());
app.use(cors());

app.use('/api/call' ,checkAuth , callsRoutes);

app.use("/api/user" , userRoutes);
// app.use("/api/admin" , adminRoutes);
app.use("/images" , express.static(path.join("images")));

app.use((req,res,next) => {
    res.send('hello Worlds');
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started on', port);
});
module.exports = app;



