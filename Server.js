const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(express.json());

app.use(cors());

app.use('/', authRoutes); // set static route

app.listen(3001, (err) => {
    if (err) console.log(err)
    console.log(`Server Started at:${PORT}`);
})