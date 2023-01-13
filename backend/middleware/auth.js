const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit')
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };

        limiter = rateLimit({
            windowMs: 5 * 60 * 1000,
            max: 5,
            standardHeaders: true,
            legacyHeaders: false,
        })

	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
