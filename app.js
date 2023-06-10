const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const ISBNInput = document.getElementById('ISBN-input');
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', submitting);

// preparing id for identify each lists
let id = 0;
if(localStorage.getItem('id')){
    id = JSON.parse(localStorage.getItem('id'));
}

// preparing an array for storing and retrieving list

let booklist = [];
if(localStorage.getItem('booklist')){
    booklist = JSON.parse(localStorage.getItem('booklist'));
    booklist.forEach(books => {
        createListedElement(books.title, books.author, books.ISBN, id);
    })
}

function removeList(id){
    booklist.forEach(books => {
        if(books.id === id){
            booklist.splice(index,1);
        }
        
    })
    document.getElementById(`table-row-container-${id}`).remove();
}

function createListedElement(title, author, ISBN, id){
    // CREATE NEW TABEL ROW CONTAINER
    const tableRowContainer = document.createElement('div');
    tableRowContainer.className = 'table-row-container';
    tableRowContainer.id = `table-row-container-${id}`;

    // CREATE NEW TITLE CONTAINER
    const titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';
    titleContainer.id = `title-container-${id}`;

    //CREATE NEW TABLE ROW TITLE
    const tableRowTitle = document.createElement('div');
    tableRowTitle.className = 'table-row-title';
    tableRowTitle.id = `table-row-title-${id}`;
    tableRowTitle.innerHTML = title;

    // APPENDING THE TABLE ROW TITLE TO THE TITLE CONTAINER
    titleContainer.appendChild(tableRowTitle);

    // CREATE NEW AUTHOR CONTAINER
    const authorContainer = document.createElement('div');
    authorContainer.className = 'author-container';
    authorContainer.id = `author-container-${id}`;

    //CREATE NEW TABLE ROW AUTHOR
    const tableRowAuthor = document.createElement('div');
    tableRowAuthor.className = 'table-row-author';
    tableRowAuthor.id = `table-row-author-${id}`;
    tableRowAuthor.innerHTML = author;

    // APPENDING THE TABLE ROW AUTHOR TO THE AUTHOR CONTAINER
    authorContainer.appendChild(tableRowAuthor);


    // CREATE NEW ISBN CONTAINER
    const ISBNContainer = document.createElement('div');
    ISBNContainer.className = 'ISBN-container';
    ISBNContainer.id = `ISBN-container-${id}`;

    //CREATE NEW TABLE ROW AUTHOR
    const tableRowISBN = document.createElement('div');
    tableRowISBN.className = 'table-row-ISBN';
    tableRowISBN.id = `table-row-ISBN-${id}`;
    tableRowISBN.innerHTML = ISBN;

    // APPENDING THE TABLE ROW AUTHOR TO THE AUTHOR CONTAINER
    ISBNContainer.appendChild(tableRowISBN);

    // CREATE NEW DELETE BUTTON CONTAINER
    const deleteButtonContainer = document.createElement('div');
    deleteButtonContainer.className = 'delete-button-container';
    deleteButtonContainer.id = `delete-button-container-${id}`;

    // CREATE NEW DELETE BUTTON
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.id = `delete-button-${id}`;
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', ()=>removeList(id))
    //APPENDING THE DELETE BUTTON TO THE DELETE BUTTON CONTAINER
    deleteButtonContainer.appendChild(deleteButton);

    // APPENDING ELEMENTS TO THE PARENT TABLE ROW CONTAINER
    tableRowContainer.appendChild(titleContainer);
    tableRowContainer.appendChild(authorContainer);
    tableRowContainer.appendChild(ISBNContainer);
    tableRowContainer.appendChild(deleteButtonContainer);
    document
        .getElementById('output-container')
        .insertBefore(tableRowContainer,
            document.getElementById('output-container').secondChild)
}


function submitting(){
    const titleDescription = titleInput.value;
    const authorDescription = authorInput.value;
    const ISBNDescription = ISBNInput.value;
    const books = {
        title: titleDescription,
        author:authorDescription,
        ISBN:ISBNDescription,
        id:id
    }

    id++;
    localStorage.setItem('id', JSON.stringify(id));

    booklist.push(books);

    localStorage.setItem('booklist',JSON.stringify(booklist));
    console.log(booklist);

    createListedElement(books.title, books.author, books.ISBN, books.id);

    console.log(id)
}





// localStorage.clear();