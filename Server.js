const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(express.json());

app.use(cors());

app.use('/', authRoutes); // set static route

// app.post("/signup", (req, res) => {

//     const { username, email, password } = req.body;

//     if (!validator.isAlpha(username.split(' ').join(''))) {  // remove white space in username from both side 
//         return res.status(400).send({ message: "Name must letter only" });
//     }
//     else if (!validator.isEmail(email)) {
//         return res.status(400).send({ message: "Email must have @ with domain and ." });
//     }
//     else if (!validator.isStrongPassword(password)) {  // check letter only
//         return res.status(400).send({ message: "Password must be minimum 8 characters with atleast one Capital and one small alphabet characters,one special characters and with number" });
//     }

//     connection.query("Select * from ecom_user where username = ? or email = ?", [username, email], async (error, result) => {

//         if (result.length > 0)
//             return res.status(409).send({ message: "User Already Exist.Try with other username and email" });

//         const hashedpassword = await bcrypt.hash(password, 10);

//         connection.query("insert into ecom_user(username,email,password) values(?,?,?) ", [username, email, hashedpassword], (err) => {

//             if (err) {
//                 return res.status(500).send({ message: "Database error" })
//             };

//             res.status(201).send({ message: "Created" });
//         })

//     })

// })

// app.post("/login", (req, res) => {

//     const { email, password } = req.body;

//     if (!validator.isEmail(email)) {
//         return res.status(400).send({ message: "Email must have @ with domain and ." });
//     }
//     else if (!validator.isStrongPassword(password)) {  // check letter only
//         return res.status(400).send({ message: "Password must be minimum 8 characters with atleast one Capital and one small alphabet characters,one special characters and with number" });
//     }

//     connection.query("Select * from ecom_user where email = ?", [email], (error, result) => {
//         if (result.length === 0) {
//             return res.status(401).send({ message: "User does not exist.Please get Registered" });
//         };

//         bcrypt.compare(password, result[0].password).then((result) => {
//             if (result) {
//                 res.status(200).send({ message: "Logged In" });
//             } else {
//                 res.status(401).send({ message: "Wrong Crendentials" });
//             }
//         })
//             .catch((err) => {
//                 console.log(err);
//             });

//     })

// })


//req
// app.route("/api/user", authRoutes); 


app.listen(3001, (err) => {
    if (err) console.log(err)
    console.log(`Server Started at:${PORT}`);
})