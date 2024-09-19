const log = console.log;

// Library array
let myLibrary = [];

// Book construcor
function Book(title, author, pages, read, favorite=false) {
    this.titlle = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.favorite = favorite;
}

// Info method efined in constructor's Prototype
// Book.prototype.info = function() {
//     return `${this.titlle} by ${this.author}, ${this.pages} pages, ${
//         this.read ? "readed" : "not readed yet"
//     }.`
// };

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const table = document.querySelector('tbody');
function createTable() {
    for (let book of myLibrary) {
        let row = document.createElement('tr');
        for (let prop in book) {
            let cell = document.createElement('td');
            cell.textContent = book[prop];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function updateTable(book) {
    let row = document.createElement('tr');
    for (let prop in book) {
        let cell = document.createElement('td');
        cell.textContent = book[prop];
        row.appendChild(cell);
    }
    table.appendChild(row);
}

function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    return book;
}

let book = addBook("Eloquent JavaScript", "Marijn Haverbeke", 435, false, true);
let book2 = addBook("Programming Logic and Design", "Joyce Farrel", 717, true, true);
let book3 = addBook("Think Like a Programmer", "Anton Spraul", 256, false, true);
createTable();

// reference form
const form = document.querySelector('form');
// reference submit button
const submit = document.querySelector('button[type="submit"]');
submit.addEventListener('click', event => {
    log(document.querySelector('input[name="author"]').value);
    log(document.querySelector('input[name="title"]').value);
    log(document.querySelector('input[name="pages"]').value);
    log(document.querySelector('input[name="read"]').checked);

    let author = (document.querySelector('input[name="author"]').value);
    let title = (document.querySelector('input[name="title"]').value);
    let pages = (document.querySelector('input[name="pages"]').value);
    let read = (document.querySelector('input[name="read"]').checked);

    let book = addBook(author, title, pages, read);
    updateTable(book);
    event.preventDefault()
})

// add event listener to submit button
// onclick get all data in the form
// use that data to create a add a new book to library

// function createTable() {
//     myLibrary.forEach( (book) =>
//         {
//             let row = document.createElement('tr');
//             for (let prop in book) {
//                 let cell = document.createElement('td');
//                 cell.textContent = book[prop];
//                 row.appendChild(cell);
//             }
//             table.appendChild(row);
//         }
//     )
// }
