const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        // const token = req.headers.authorization.split(" ")[1];
        // jwt.verify(token ,"hbvhbhjbhvvhebdfufierhuav");
        // next();
        let token;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
           }else if (req.query && req.query.token) {
            token = req.query.token;
           }
        jwt.verify(token ,"hbvhbhjbhvvhebdfufierhuav" ,(err, verifiedJwt) => {
            if(err){
              res.send(err.message)
            }else{
              res.send(verifiedJwt)
            }
        });
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            message : "auth failed!" 
        })

    }
}