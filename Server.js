const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const wishListRoutes = require('./routes/wishListRoutes.js');
const pricingRoutes = require('./routes/pricingRoutes.js');

const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// parse json 
app.use(express.json({ limit: '10mb' }));

// cookie parser
app.use(cookieParser());

// cors set allow cookie and headers
app.use(cors({
    origin: 'http://localhost:3000',   // set origin
    Method: "GET,POST,PUT,DELETE,PATCH", // set method
    credentials: true   // allow cookies and headers
}));

app.use('/', authRoutes); // set static route

app.use('/profile', profileRoutes); // profile route

app.use('/product', productRoutes); // product route

app.use('/cart', cartRoutes); // set cart route

app.use('/wishList', wishListRoutes); // set wishlist route

app.use('/pricing', pricingRoutes);  // pricing

app.listen(3001, (err) => {
    if (err) console.log(err);
    console.log(`Server Started at:${PORT}`);
})