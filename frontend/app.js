const API = "http://localhost:5000/api/books"; //link to the backend

let currentPage = 1;
let limit = 5;

document.getElementById("addBookForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const book = {  //onsubmit form data to be submitted
        title : document.getElementById("title").value,
        author : document.getElementById("author").value,
        price : document.getElementById("price").value,
    }

    // console.log(book);
    const res = await fetch(API, {  // making an api call
        method : "POST",
        headers : { "Content-Type" : "application/json"},  //api : token >> sending request to protected routes
        body : JSON.stringify(book)
    });

    if (res.ok) {
        alert("Book added!");
        e.target.reset();

        //call function
        loadBooks();
    }

});