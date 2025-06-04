//  - Find all books in a specific genre
db.books.find({
    genre : "Fiction",
});


// - Find books published after a certain year
db.books.find({
    "year" : { $gt : 1999}
});

db.books.find({
    "published_year" : { $lt : 1971}
})


// Find books by a specific author

db.books.find({
    author: "Paulo Coelho"
});

// Update the price of a specific book
db.books.findOneAndUpdate(
  { author : "Paulo Coelho"},
  {$set : { price : 5.99 }},
  {returnNewDocument : true}
);

// - Delete a book by its title
db.books.findOneAndDelete(
  { title : "The Alchemist"}
)