// Library array
let myLibrary = [];

// Book construcor
class Book {
    constructor(title, author, pages, read, favorite=false) {
        this.titlle = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.favorite = favorite;
    }

    // Get index in library of current Book instance
    index() {
        return myLibrary.indexOf(this);
    }
}

// Add book to library
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Create book object and add it to library
function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    return book;
}

const initialBooks = [
    ["Eloquent JavaScript", "Marijn Haverbeke", 435, false, true],
    ["Programming Logic and Design", "Joyce Farrel", 717, true, true],
    ["Think Like a Programmer", "Anton Spraul", 256, false, true]
]

// Add initial set of books to library array
for (let book of initialBooks) {
    addBook(...book)
}

// Toggle read status
function toggleRead(book, event) {
    if (book.read === true) {
        book.read = false;
    } else if (book.read === false) {
        book.read = true;
    }
    event.target.closest('svg').classList.toggle('read');
}

// Remove book from library
function removeBook(book, event) {
    let row = document.querySelector(`tr[data-index="${book.index()}"]`);
    row.parentNode.removeChild(row);    
    myLibrary[book.index()] = null;
}

// Toggle favorite
function toggleFav(book, event){
    if (book.favorite === true) {
        book.favorite = false;
    } else if (book.favorite === false) {
        book.favorite = true;
    }
    event.target.closest('svg').classList.toggle('favorite')
}

// Create book row in the table
const table = document.querySelector('tbody');
function createBookRow(book) {
    let row = document.createElement('tr');
    row.setAttribute('data-index', `${book.index()}`);
    for (let prop in book) {
        let cell = document.createElement('td');
        if (prop == "index") {
            continue
        }
        else if (prop == "read") {
            let readIcon = svgIcon.read();
            cell.classList.add('status');
            cell.appendChild(readIcon);
            
            if (book[prop]) {
                readIcon.classList.toggle('read');
            };
        }
        else if (prop == 'favorite') {
            let favIcon = svgIcon.favorite();
            if (book[prop]) {
                favIcon.classList.toggle('favorite')
            }
            row.querySelector('.status').appendChild(favIcon);
            let removeIcon = svgIcon.remove();
            row.querySelector('.status').appendChild(removeIcon);
            continue;
        }
        else {
            cell.textContent = book[prop];
        }
        row.appendChild(cell);
    }
    let bookIndex = document.createElement('input');
    bookIndex.setAttribute('type', 'hidden');
    bookIndex.setAttribute('value', `${book.index()}`)
    row.appendChild(bookIndex);
    table.appendChild(row);
}

// Fill table body with books
function createTable() {
    for (let book of myLibrary) {
        createBookRow(book);
    }
}

// create object with fucntions for creating svg icon elements
svgIcon = {
    read: function() {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('viewBox', "0 0 24 24");
        svg.classList.add('iconRead');
        svg.innerHTML = `
            <title>Read</title>
            <path d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" />
            `;
    
        svg.addEventListener('click', event => toggleRead(myLibrary[+event.target.closest('tr').dataset['index']], event))
        return svg;
    },
    remove: function() {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('viewBox', "0 0 24 24");
        svg.classList.add('iconRemove');
        svg.innerHTML = `
            <title>Remove</title>
            <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
            `;
        svg.addEventListener('click', event => removeBook(myLibrary[+event.target.closest('tr').dataset['index']], event))
        return svg;
    },
    favorite: function() {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('viewBox', "0 0 24 24");
        svg.classList.add('iconFav');
        svg.innerHTML = `
            <title>Favorite</title>
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            `;
        svg.addEventListener('click', event => toggleFav(myLibrary[+event.target.closest('tr').dataset['index']], event))
        return svg;
    },
}

// reference form
const form = document.querySelector('form');
// reference submit button
const submit = document.querySelector('button[type="submit"]');
submit.addEventListener('click', event => {
    if (!form.checkValidity()) {return}

    let author = (document.querySelector('input[name="author"]').value);
    let title = (document.querySelector('input[name="title"]').value);
    let pages = (document.querySelector('input[name="pages"]').value);
    let read = (document.querySelector('input[name="read"]').checked);

    let book = addBook(author, title, pages, read);
    form.reset();
    createBookRow(book);
    // event.preventDefault()
})

const cancel = document.querySelector('.cancel');
cancel.addEventListener('click', event => {dialog.close()})
const dialog = document.querySelector('dialog');
const addBookBtn = document.querySelector('main > button');
addBookBtn.addEventListener('click', event => {
    dialog.showModal()
})

// Create actual page book's table
createTable();