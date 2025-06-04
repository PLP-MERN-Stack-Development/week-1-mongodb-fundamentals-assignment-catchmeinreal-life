const express  = require("express");
const mongoose = require("mongoose");


const bookRoutes = require("./routes/books.js");


//
const app = express();
app.use(express.json());

//routes
app.use("/api/books", bookRoutes);

// connect to mongoDB
mongoose.connect("mongodb://localhost:27017/plp_bookstore")
    .then(() => {
        console.log("connected to mongodb...");
        app.listen(6446, () => {
            console.log("sever is running on port 6446")
        });
    })
    .catch(err => console.error("mongoDB connection eror:", err))