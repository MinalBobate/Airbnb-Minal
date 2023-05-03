require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.DB;

mongoose
    .connect("mongodb://127.0.0.1:27017/AirbnbClone2", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    })
    .then(() => {
        console.log(`db connection successful`);
    })
    .catch((err) => console.log(err));

// mongoose
//     .connect(mongoURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         // useCreateIndex: true
//     })
//     .then(() => {
//         console.log(`db connection successful`);
//     })
//     .catch((err) => console.log(err));