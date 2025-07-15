const bcrypt = require('bcrypt');
const validator = require('validator');
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const dotenv = require('dotenv');

// load environment variables to process.env
dotenv.config();

//Signup controller
exports.signup = (req, res) => {

    let { username, email, password } = req.body;

    username = username.trim();
    email = email.trim();
    password = password.trim();

    const passwordSchema = new passwordValidator(); // set schema for validation

    passwordSchema
        .is().min(4, 'minimum 4 character required')
        .is().max(8, 'maximum 8 character password')
        .has().uppercase(1, 'atleast one uppercase')
        .has().lowercase(1, 'atleast one lowercase')
        .has().digits(2, 'atleast two digits')
        .has().not().spaces(); // set rules

    if (username && (!validator.isAlpha(username.split(' ').join('')))) {  // remove white space in username from both side 
        return res.status(400).send({ message: "Name must letter only" });
    }
    else if (!validator.isEmail(email)) {
        return res.status(400).send({ message: "Please Provide Valid Email" });
    }
    else if (!passwordSchema.validate(password)) {  // check letter only
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

                if (err) {
                    return res.status(500).send({ message: "Database error" });
                };

                res.status(201).send({ message: "Created" });
            })
        }

        catch (error) {
            res.status(500).send(error.message);
        }
    })

}

// login 
exports.login = (req, res) => {

    let { email, password } = req.body;

    email = email.trim();
    password = password.trim();

    const passwordSchema = new passwordValidator(); // set schema for validation

    passwordSchema
        .is().min(4, 'minimum 4 character required')
        .is().max(8, 'maximum 8 character password')
        .has().uppercase(1, 'atleast one uppercase')
        .has().lowercase(1, 'atleast one lowercase')
        .has().digits(2, 'atleast two digits')
        .has().not().spaces(); // set rules

    if (!validator.isEmail(email)) {
        return res.status(400).send({ message: "Please Provide Valid Email" });
    }
    else if (!passwordSchema.validate(password)) {  // check letter only
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

                        res.cookie('token', token, {
                            httpOnly: true,
                            secure: true, // false for dev only
                            sameSite: 'None' // set for cross-site 
                        });// set cookie
                        res.status(200).send({ message: "Logged In" });

                    } else {
                        res.status(401).send({ message: "Wrong Crendentials.Try with Correct email and password" });
                    }
                })
                    .catch((err) => { return res.status(500).send(err.message) });
            }
        }
        catch (error) {
            res.status(500).send(error.message);
        }

    })

}

exports.isLoggedIn = (req, res) => {
    try {
        return res.status(200).json({ message: "Logged In" });
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }

}

exports.logOut = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
    });
    // res.status(200).json({ message: "Logged Out" });
    res.redirect("http://localhost:3000/login");
}