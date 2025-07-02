const express = require('express');
const connection = require('./db');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const PORT = 3001;

app.use(express.json());

app.post("/addProduct", upload.single('file'), (req, res) => {
    console.log(req);
    // connection.query("Insert Into ecommerce Values(image,title,content,categories,price)", [], 
    // )
})

app.get() // get data / filter data

app.post("/signUp", (req, res) => {

    console.log(req.body);
    const { username, email, password } = req.body;
    console.log(e.target.Files[0]);

    if (!username || !email || !password) {
        return res.status(400).send({ message: "Please All Required Details" });
    }

    let smallAlpabet = false;
    let capitalAlpabet = false;
    let numberRange = false;

    for (const ab of password) {
        if (ab >= 'a' && ab <= 'z') {
            smallAlpabet = true;
        }
        else if (ab >= 'A' && ab <= 'Z') {
            capitalAlpabet = true;
        }
        else if ((ab >= 1 && ab <= 9)) {
            numberRange = true;
        }
    }

    if (smallAlpabet && capitalAlpabet && numberRange) return res.status(400).send({ message: "Password must contain atleast one small and capital characters and one number." });

    connection.query("Select * from ecom_user where user")
})

app.listen(3001, (err) => {
    if (err) console.log(err)
    console.log(`Server Started at:${PORT}`);
})