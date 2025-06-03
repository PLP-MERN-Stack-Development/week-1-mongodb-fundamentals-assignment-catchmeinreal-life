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

async  function loadBooks(page = 1) {
    const search = document.getElementById("searchInput").value; // element

    const url = new URL(API)

    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    // "http://localhost:5000/api/books?page=1&limit=5"
    
    // search input
    if (search) url.searchParams.append("search", search); //"http://localhost:5000/api/books?page=1&limit=5&search=eric"
    // console.log(url);


    // api request
    const res = await fetch(url);
    const data = await res.json();

    currentPage = data.page;   //what does this mean
    renderBooks(data.books);  // call a function  =>> display at the client
    renderPagination(data.totalPages);
}

function renderBooks(books) {
    const container = document.getElementById("bookList"); // element selection

    //clear content first
    container.innerHTML = "";
    books.forEach(book => {
        const div = document.createElement("div");
        div.className = "book";  //class="book";
        div.innerHTML =`
            <strong>${book.title}</ strong> by ${book.author || "Unknown"}<br>
            <p>${book.price || "N/A"}</p>
            <button onclick="deleteBook('${book._id}')">Delete</button>
        `;
        container.appendChild(div);
    });

}