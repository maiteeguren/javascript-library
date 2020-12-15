// Variables
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const isbnInput = document.getElementById('isbn');
const read = document.getElementById("read");
const submitBtn = document.getElementById('submit-btn');
const bookList = document.getElementById('book-list');
const booksArray = JSON.parse(localStorage.getItem("booksArray")) || [];

// Book constructor function

function Book(title, author, isbn, read) {
    this.title = title.value,
    this.author = author.value,
    this.isbn = isbn.value,
    this.read = read.checked ? 'Read' : 'Unread'
}

// Save booklist array in local storage
function serializeBooklist() {
    const booksArray_serialized = JSON.stringify(booksArray);
    localStorage.setItem("booksArray", booksArray_serialized);
}

// Delete book
function deleteRow(index) {
    booksArray.splice(index, 1);
    serializeBooklist();
    location.reload();
}

//Mark as read
function markRead(index) {
    booksArray[index]["read"] = 'Read';
    serializeBooklist();
    location.reload();
}

// Mark as unread
function markUnread(index) {
    booksArray[index]["read"] = 'Unread';
    serializeBooklist();
    location.reload();
}

// Parse existing books stored locally
function getLocalBooks() {
    bookList.innerHTML = "";

    booksArray.forEach(book => {
        const bookListRow = document.createElement("tr");
        const bookIndex = booksArray.indexOf(book);
        
        for (let key in book) {
            const td = document.createElement("td");
            td.innerHTML = book[key];
            bookListRow.appendChild(td);
        }

        const actions = document.createElement("td");
        if (book.read === 'Unread') {
            actions.innerHTML = `<i class="fa fa-check" onclick="markRead(${bookIndex})"></i></i> <i class="fa fa-trash" onclick="deleteRow(${bookIndex})"></i>`;
        } else {
            actions.innerHTML = `<i class="fa fa-times" onclick="markUnread(${bookIndex})"></i> <i class="fa fa-trash" onclick="deleteRow(${bookIndex})"></i>`;
        }
        bookListRow.appendChild(actions);
        bookList.appendChild(bookListRow);
    });
}


// Show existing books on load
getLocalBooks();

// Create and append book to table every time the form is submitted

submitBtn.addEventListener('click', function(){
    if (titleInput == "" && authorInput == "" && isbnInput == "") {
        alert("Enter any input");
    } else {
        const newBook = new Book(titleInput, authorInput, isbnInput, read);
        booksArray.push(newBook);
        
        serializeBooklist();
        getLocalBooks();
    }
})
