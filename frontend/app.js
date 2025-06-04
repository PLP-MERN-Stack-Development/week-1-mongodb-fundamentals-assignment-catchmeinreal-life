const API = "http://localhost:6446/api/books/"; //link to the backend

let currentPage = 1;
let limit = 5;


/**adding a book from form data
 * 
 * then calling the loadBooks() function
 */
document.getElementById("addBookForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const book = {  //onsubmit form data to be submitted
        title : document.getElementById("title").value,
        author : document.getElementById("author").value,
        price : document.getElementById("price").value,
    }

    console.log(JSON.stringify(book));
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
    // const res = await fetch(API, {  // making an api call
    //     method : "GET",
    //     headers : { "Content-Type" : "application/json"},  //api : token >> sending request to protected routes
    //     body : JSON.stringify(book)
    // });
    const res = await fetch(url);  //API
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


function renderPagination(totalPages) {
    const container = document.getElementById("pagination");
    container.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.onclick = () => loadBooks(i);

        if ( i === currentPage ) btn.style.fontWeight = "bold";
        container.appendChild(btn);
    }
}

async function deleteBook(id) {
    if (confirm("Delete this book?")) {
        await fetch(`${API}/${id}`, {
            method : "DELETE"
        });
        loadBooks(currentPage);
    }
}

//initial load 
loadBooks();