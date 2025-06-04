const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title : { type : String, required : true },
    author : String,
    price : Number,
    inStock : { type : Boolean, default : true},
}, { timestamps : true });

modules.exports = mongoose.model("Book", BookSchema);