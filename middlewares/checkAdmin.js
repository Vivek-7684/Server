const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// load environment variables to process.env
dotenv.config();

// check Role and verify Admin
const checkAdmin = async (req, res, next) => {
    try {
        const token = req.headers.cookie.split("=")[1];

        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }


        const a = jwt.verify(token, process.env.SECRET_KEY);

        // if admin 
        if (a.user_role === 'admin') {
            return next();
        }
        return res.status(403).json({ message: "Access Denied.User is not an Admin" })

    }
    catch (err) {
        return res.status(401).json({ message: err.message });
    }

}

module.exports = checkAdmin;
