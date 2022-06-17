require('dotenv').config() ;
const express = require("express");
const cors = require('cors')
const Call = require('./models/issues');
const mongoose = require('mongoose');

const app = express();
const userRoutes = require('./routes/user');
const callsRoutes = require('./routes/calls');

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true})
  .then(()=> {
    console.log ('connected to database');
  })
  .catch((err)=>{
    console.log('connection failed', err);
  })

app.use(express.json());
app.use(cors());

app.use('/api/call' , callsRoutes);

app.use("/api/user" , userRoutes);

app.use((req,res,next) => {
    res.send('hello Worlds');
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started on', port);
});
module.exports = app;



