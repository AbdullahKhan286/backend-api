const mongoose = require('mongoose');


const connectDB = async () => {
    await mongoose.connect(process.env.URI).then((res) => {
        console.log("Connected to the database");
    });
};

module.exports = connectDB;

