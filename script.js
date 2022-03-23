let myLibrary = [];
const addBook = document.getElementById('add-book');
const tBody = document.getElementById('table-body'); 
let delButtons = undefined;
const form = document.getElementById('AddBook');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const title = form.elements['title'];
    const author = form.elements['author'];
    const pages = form.elements['pages'];
    const read = form.elements['read'];
    let checkBox = '';
    
    if(read.checked) {
        checkBox = 'Read'
    }
    else if(!read.checked) {
        checkBox = 'Not Read'
    }

    addBookToLibrary(title.value, author.value, pages.value, checkBox)
    closeModal();
    form.reset();
});
addBook.onclick = popupModal;
close.onclick = closeModal;

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    pushToTable();
}

function popupModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function pushToTable() {
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-row', myLibrary.length - 1);
    tBody.appendChild(newRow);

    const latestBook = myLibrary.slice(-1)[0]; 
    for(let key in latestBook) {
        const newData = document.createElement('td');
        console.log(key);
        if(key == "read") {
            const statusButton = document.createElement('button');
            statusButton.setAttribute('data-index', myLibrary.length - 1);
            statusButton.innerHTML = latestBook[key];
            newData.appendChild(statusButton);
            statusButton.addEventListener('click', function() {
                switchStatus(this);
            });
        }
        else {
            newData.innerHTML = latestBook[key];
        }    
        newRow.appendChild(newData);
    }
    const buttonCell = document.createElement('td');
    const delButton = document.createElement('button');
    delButton.innerHTML = 'Delete';
    delButton.setAttribute('data-index', myLibrary.length - 1);
    buttonCell.appendChild(delButton);
    newRow.appendChild(buttonCell);
    delButton.addEventListener('click', function() {
        removeRow(this);
    }, false);
}

function removeRow(clickedButton) {
    const toDelete = clickedButton.getAttribute('data-index');
    const rowToDelete = document.querySelector(`[data-row="${toDelete}"]`);
    rowToDelete.remove();
    myLibrary.splice(toDelete, 1);
}

function switchStatus(button) {
    const switchButton = button.getAttribute('data-index');
    if(button.innerHTML == "Read") {
        myLibrary[switchButton].read = "Not Read";
        button.innerHTML = "Not Read"
    }
    else {
        myLibrary[switchButton].read = "Read";
        button.innerHTML = "Read"
    }
}