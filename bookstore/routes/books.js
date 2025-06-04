const express = require("express");
const router = express.Router();
const Book = require("../models/Book.js");

//create >> add abook
router.post("/", async (req, res) => {
    try {
        const book = await Book.create(req.body);    // insertOne(req.body)
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error : error.message})   // error on insertion
    }
});


// read all >> db.Book.find({});
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books)
    } catch (error) {
        res.status(400).json({ error : error.message})
    }
});

// read one book >> search for a specific book

router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ message : "not found" });
        res.json(book);
    } catch (error) {
        res.status(400).json({ error : error.message})
    }
});


//update a book
router.put("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new : true });

        if (!book) return res.status(404).json({ message : "not found" });
        res.json(book);
    } catch (error) {
        res.status(400).json({ error : error.message})
    }
});

// delete a book
router.delete("/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);

        
        res.json({ message : "book deleted" });
    } catch (error) {
        res.status(400).json({ error : error.message})
    }
});

module.exports = router;