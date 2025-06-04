
/**task 2 */
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

/**
 * ### Task 3: Advanced Queries
 * 
 * 
 * - Write a query to find books that are both in stock and published after 2010
 */
db.books.find(
    { $and : [
        { in_stock : true },
        { published_year : { $gt : 2010}}
    ]}
);  // n books were publised after this year


// - Use projection to return only the title, author, and price fields in your queries
db.books.find(
    {},{
        "\_id" : 0,
        "author": 1,
        "title" : 1,
        "price" : 1
});

// Implement sorting to display books by price (both ascending and descending)

db.books.find( {} ).sort({ price : 1 }) ; // ascending
db.books.find( {} ).sort({ price : -1 });  // descending

//Use the `limit` and `skip` methods to implement pagination (5 books per page)
// skip the first one and return only 3 books 

db.books.find({}).skip(1).limit(3);

