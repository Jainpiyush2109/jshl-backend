require('dotenv').config() ;
const express = require("express");
const cors = require('cors')
const Call = require('./models/issues');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true})
  .then(()=> {
    console.log ('connected to database');
  })
  .catch((err)=>{
    console.log('connection failed', err);
  })

app.use(express.json());
app.use(cors());

app.post("/api/call" , (req,res,next) => {
  const call = new Call(req.body) ;
  call.save();
  console.log(call);
  res.status(201).json({
    message: 'Post added Successfully'
  });

});

app.get("/api/call",(req,res,next) => {
    Call.find().then(calls => {
      res.status(200).json({
        message : 'post fetched',
        calls : calls
      });
    });
    
    
})

app.delete("/api/call/:id" , (req,res,next) => {
  console.log(req.params.id);
  res.status(200).json({
    message : 'Call Deleted'
  });
});

app.use((req,res,next) => {
    res.send('hello Worlds');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started on', port);
});
module.exports = app;



