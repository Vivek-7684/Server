const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../model/userModel');

//Signup controller
exports.signup = (req, res) => {

    const { username, email, password } = req.body;

    if (!validator.isAlpha(username.split(' ').join(''))) {  // remove white space in username from both side 
        return res.status(400).send({ message: "Name must letter only" });
    }
    else if (!validator.isEmail(email)) {
        return res.status(400).send({ message: "Email must have @ with domain and ." });
    }
    else if (!validator.isStrongPassword(password)) {  // check letter only
        return res.status(400).send({ message: "Password must be minimum 8 characters with atleast one Capital and one small alphabet characters,one special characters and with number" });
    }

    //Check if user exists

    User.findUserByUsernameOREmail(username, email, async (error, result) => {

        if (error) return res.status(500).send({ message: "Database Error" });

        if (result.length > 0) return res.status(409).send({ message: "User Already Exist.Try with other username and email" });

        const hashedpassword = await bcrypt.hash(password, 10);

        // insert new user
        User.insertUser(username, email, hashedpassword, (err) => {

            if (err) return res.status(500).send({ message: "Database error" })

            res.status(201).send({ message: "Created" });
        })

    })

}

// login 
exports.login = (req, res) => {

    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).send({ message: "Email must have @ with domain and ." });
    }
    else if (!validator.isStrongPassword(password)) {  // check letter only
        return res.status(400).send({ message: "Password must be minimum 8 characters with atleast one Capital and one small alphabet characters,one special characters and with number" });
    }

    User.getUsernameByEmail(email, (error, result) => {

        if (error) return res.status(500).send({ message: "Server Error" });

        if (result.length === 0) return res.status(401).send({ message: "User does not exist.Please get Registered" });

        bcrypt.compare(password, result[0].password).then((result) => {
            if (result) {
                res.status(200).send({ message: "Logged In" });
            } else {
                res.status(401).send({ message: "Wrong Crendentials" });
            }
        })
            .catch((err) => { console.log(err) });

    })


}