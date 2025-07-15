const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

// parse json 
app.use(express.json());

// cookie parser
app.use(cookieParser());

// cors set allow cookie and headers
app.use(cors({
    origin: 'http://localhost:3000',   // set origin
    Method:"GET,POST,PUT,DELETE", // set method
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true   // allow cookies and headers
}));

app.use('/', authRoutes); // set static route

app.use('/product', productRoutes); 

app.listen(3001, (err) => {
    if (err) console.log(err)
    console.log(`Server Started at:${PORT}`);
})