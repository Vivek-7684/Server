const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// load environment variables to process.env
dotenv.config();

// check Token and verify
const CheckAndVerifyToken = async (req, res, next) => {
    // get token 
    const token = await req.cookies.token;

    if (!token) return res.status(401).json({ redirect: "/login" });
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // check valid token 
        req.Email = decoded.Email;
        next();
    } catch (err) {
        res.status(401).json({ error: "Your session has ended for security concern. Please log in to continue." });
    }
}

module.exports = CheckAndVerifyToken;