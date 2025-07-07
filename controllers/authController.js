const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const dotenv = require('dotenv');

// load environment variables to process.env
dotenv.config();

//Signup controller
exports.signup = (req, res) => {

    const { username, email, password } = req.body;

    if (username && (!validator.isAlpha(username.split(' ').join('')))) {  // remove white space in username from both side 
        return res.status(400).send({ message: "Name must letter only" });
    }
    else if (!validator.isEmail(email)) {
        return res.status(400).send({ message: "Email must have @ with domain and ." });
    }
    else if (!validator.isStrongPassword(password)) {  // check letter only
        return res.status(400).send({ message: "Password with Correct Format" });
    }

    //Check if user exists

    User.findUserByUsernameOREmail(username, email, async (error, result) => {

        try {
            const len = await result.length;

            if (error) { return res.status(500).send({ message: "Database Error" }); }

            else if (len > 0) { return res.status(409).send({ message: "User Already Exist.Try with other username and email" }); }

            const hashedpassword = await bcrypt.hash(password, 10);

            // insert new user
            User.insertUser(username, email, hashedpassword, (err) => {

                if (err) { return res.status(500).send({ message: "Database error" }) };

                res.status(201).send({ message: "Created" });
            })
        }

        catch (error) {
            console.log(error);
        }
    })

}

// login 
exports.login = (req, res) => {

    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).send({ message: "Email must have @ with domain and ." });
    }
    else if (!validator.isStrongPassword(password)) {  // check letter only
        return res.status(400).send({ message: "Please Enter Valid Password Format" });
    }

    User.getUsernameByEmail(email, (error, result) => {

        try {
            if (error) return res.status(500).send({ message: "Server Error" });

            else if (result.length === 0) return res.status(401).send({ message: "User does not exist.Please get Registered" });

            else {
                bcrypt.compare(password, result[0].password).then((result) => {
                    if (result) {
                        const token = jwt.sign({
                            Email: email,
                        }, process.env.SECRET_KEY);

                        res.status(200).send({ message: "Logged In", token: token });

                    } else {
                        res.status(401).send({ message: "Wrong Crendentials.Try with Correct email and password" });
                    }
                })
                    .catch((err) => { console.log(err) });
            }
        }
        catch (error) {
            console.log(error);
        }

    })

}