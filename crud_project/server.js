const express = require('express');
const connectDB = require('./database/db');
const bodyParser = require('body-parser');
const crudRoutes = require('./routes/crudRoutes');
const env = require('dotenv');
env.config();

const app = express();

app.use(bodyParser.json());

connectDB();

app.use('/api', crudRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});




