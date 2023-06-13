//DATA, OR REPRESENTING THE BOOK
class Book {
  constructor(title, author, isbn, id) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.id = id;
  }
}

// UI CLASS: HANDLING UI TASK
class UI {
  static displayBooks() {
    // we will take datas or books from the local storage but for now we pretend with the hard coded array

    

    Store.getStoredBook().forEach((book) => UI.addBookToList(book));    
  }


  static addBookToList(book) {
    // CREATE NEW TABEL ROW CONTAINER
    const tableRowContainer = document.createElement("div");
    tableRowContainer.className = "table-row-container";
    tableRowContainer.id = `table-row-container-${book.id}`;

    // CREATE NEW TITLE CONTAINER
    const titleContainer = document.createElement("div");
    titleContainer.className = "title-container";
    titleContainer.id = `title-container-${book.id}`;

    //CREATE NEW TABLE ROW TITLE
    const tableRowTitle = document.createElement("div");
    tableRowTitle.className = "table-row-title";
    tableRowTitle.id = `table-row-title-${book.id}`;
    tableRowTitle.innerHTML = book.title;

    // APPENDING THE TABLE ROW TITLE TO THE TITLE CONTAINER
    titleContainer.appendChild(tableRowTitle);

    // CREATE NEW AUTHOR CONTAINER
    const authorContainer = document.createElement("div");
    authorContainer.className = "author-container";
    authorContainer.id = `author-container-${book.id}`;

    //CREATE NEW TABLE ROW AUTHOR
    const tableRowAuthor = document.createElement("div");
    tableRowAuthor.className = "table-row-author";
    tableRowAuthor.id = `table-row-author-${book.id}`;
    tableRowAuthor.innerHTML = book.author;

    // APPENDING THE TABLE ROW AUTHOR TO THE AUTHOR CONTAINER
    authorContainer.appendChild(tableRowAuthor);

    // CREATE NEW ISBN CONTAINER
    const ISBNContainer = document.createElement("div");
    ISBNContainer.className = "ISBN-container";
    ISBNContainer.id = `ISBN-container-${book.id}`;

    //CREATE NEW TABLE ROW AUTHOR
    const tableRowISBN = document.createElement("div");
    tableRowISBN.className = "table-row-ISBN";
    tableRowISBN.id = `table-row-ISBN-${book.id}`;
    tableRowISBN.innerHTML = book.isbn;

    // APPENDING THE TABLE ROW AUTHOR TO THE AUTHOR CONTAINER
    ISBNContainer.appendChild(tableRowISBN);

    // CREATE NEW DELETE BUTTON CONTAINER
    const deleteButtonContainer = document.createElement("div");
    deleteButtonContainer.className = "delete-button-container";
    deleteButtonContainer.id = `delete-button-container-${book.id}`;

    // CREATE NEW DELETE BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.id = `delete-button-${book.id}`;
    deleteButton.innerHTML = "Delete";

    //APPENDING THE DELETE BUTTON TO THE DELETE BUTTON CONTAINER
    deleteButtonContainer.appendChild(deleteButton);

    // ADDING THE EVENT LISTNER
    deleteButton.addEventListener("click", ()=> UI.removeList(book));

    // APPENDING ELEMENTS TO THE PARENT TABLE ROW CONTAINER
    tableRowContainer.appendChild(titleContainer);
    tableRowContainer.appendChild(authorContainer);
    tableRowContainer.appendChild(ISBNContainer);
    tableRowContainer.appendChild(deleteButtonContainer);
    document
      .getElementById("output-container")
      .insertBefore(
        tableRowContainer,
        document.getElementById("output-container").secondChild
      );
  }

//VALIDATION
 static validateInput(title, author, isbn){
  if(title === "" || author === "" || isbn === "" ){
    return false;
  }
  else{
    return true;
  }
 }

//  CLEAR THE FIELD
  static clearInputField(){
    document.getElementById('title-input').value = "";
    document.getElementById('author-input').value = "";
    document.getElementById('ISBN-input').value = "";
  }

// ALERT MESSAGE FUNCTION
static showAlert(message) {
  const div = document.createElement('div');
  div.className = 'showAlert';
  
  div.appendChild(document.createTextNode(message));

  const mainInputContainer = document.getElementById('main-input-container');
  const inputContainer = document.getElementById('input-container');

  mainInputContainer.insertBefore(div, inputContainer);

  // VANISH IN TIME OR SET-TIME OUT

  setTimeout(()=> document.querySelector('.showAlert').remove(),2000);

  }


  static removeList(book){
   // REMOVE BOOK FROM THE UI
     document.getElementById(`table-row-container-${book.id}`).remove();
   // REMOVE BOOK FROM THE STORE
     Store.removeStoreBook(book.id);
    }
}

class Store{
  static booklist = [];
  static getStoredBook(){
    
    if(localStorage.getItem('booklist')){
      Store.booklist = JSON.parse(localStorage.getItem('booklist'));
    }
    return Store.booklist;
  }
  static addStoreBook(book){
    Store.booklist.push(book);
    localStorage.setItem('booklist', JSON.stringify(Store.booklist));
  }
  static removeStoreBook(id){
    (Store.booklist).forEach((book, index)=>{
      if(book.id === id){
        (Store.booklist).splice(index,1)
      }
    })
    localStorage.setItem('booklist', JSON.stringify(Store.booklist));
  }
}
// STORAGE
id = 4;
if(localStorage.getItem('id')){
    id = JSON.parse(localStorage.getItem('id'));
}

//  EVENTS

// DISPLAY BOOKS

// RETRIEVE FROM THE LOCAL STORAGE
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// ADD BOOKS USING FILLING THE FORM
    
document.getElementById('submit-button').addEventListener('click',submitting);
function submitting(e){
   
    const titleInput = document.getElementById('title-input');
    const authorInput = document.getElementById('author-input');
    const isbnInput = document.getElementById('ISBN-input');
    title = titleInput.value;
    author = authorInput.value;
    isbn = isbnInput.value;

  // VALIDATE THE INPUTS
  if(UI.validateInput(title.replace(/\s/g, ""), author.replace(/\s/g, ""), isbn.replace(/\s/g, ""))){

    // CLEAR THE FIELD
    UI.clearInputField();

    // INSTANTIATE THE BOOK
    book = new Book(title, author, isbn, id);

    // ADDING BOOK TO UI
    UI.addBookToList(book);

    // ADD BOOK TO STORE
    Store.addStoreBook(book);
    id++;
    console.log(book);

    
  }
  else
  {
    UI.showAlert('please fill in all fields')
    
  }
}





