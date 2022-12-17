// Dom Selectors

const titleInput = document.querySelector(`#title`);
const authorInput = document.querySelector(`#author`);
const pagesInput = document.querySelector(`#pages`);
const read1 = document.querySelector(`#read1`);
const read2 = document.querySelector(`#read2`);
const submitBtn = document.querySelector(`#submit`);
const table = document.querySelector(`table`);
const form = document.querySelector(`form`);
const addnewbookBtn = document.querySelector(`#addBook`);
const grayout = document.querySelector(`#grayout`);
const closeBtn = document.querySelector(`#close`);

// Book Storing Array Stores Objects created by the book function
let myLibary = [
  {
    title: "Afterlives",
    author: "Abdulrazak Gurnah",
    pages: "320",
    read: false,
  },
  {
    title: "A Heart That Works",
    author: "Robe Delaney",
    pages: "196",
    read: false,
  },
  {
    title: "All the Lovers in  the Night",
    author: "Mieko Kawakami",
    pages: "224",
    read: false,
  },
  {
    title: "All This Could Be Different",
    author: "Sarah Thankam Mathews",
    pages: "320",
    read: false,
  },
];

//  Object creator for book

function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  // this.info = function () {
  //   return `${title}, ${author}, ${pages}, ${read}`;
  // };
}

// Reset the form when you exit it and not submit

const resetForm = function () {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  read1.checked = false;
  read2.checked = false;
};

// Submit Button Checks if every required element been met

const submit = function (e) {
  if (
    titleInput.value !== "" &&
    authorInput.value !== "" &&
    pagesInput.value !== ""
  ) {
    if (read1.checked === true || read2.checked === true) {
      let readStatus = "";
      if (read1.checked === true) readStatus = true;
      if (read2.checked === true) readStatus = false;
      myLibary.push(
        new book(
          titleInput.value,
          authorInput.value,
          pagesInput.value,
          readStatus
        )
      );
      e.preventDefault();
      resetForm();
      closeForm();
      drawBooks(myLibary.length);
    }
  }
};

submitBtn.addEventListener(`click`, submit);

//  Draws the Books on Page in a Table

const drawBooks = function (e) {
  remove();
  for (let i = 0; i < e; i++) {
    const tr = document.createElement("tr");
    tr.className = "thebooks";
    const titlebook = document.createElement(`td`);
    const authorbook = document.createElement(`td`);
    const pagesbook = document.createElement(`td`);
    const readbook = document.createElement(`td`);
    const Actions = document.createElement(`td`);
    const btn = document.createElement("button");
    const edit = document.createElement("button");
    edit.innerHTML = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M21,5C19.89,4.65 18.67,4.5 17.5,4.5C15.55,4.5 13.45,4.9 12,6C10.55,4.9 8.45,4.5 6.5,4.5C4.55,4.5 2.45,4.9 1,6V20.65C1,20.9 1.25,21.15 1.5,21.15C1.6,21.15 1.65,21.1 1.75,21.1C3.1,20.45 5.05,20 6.5,20C8.45,20 10.55,20.4 12,21.5C13.35,20.65 15.8,20 17.5,20C19.15,20 20.85,20.3 22.25,21.05C22.35,21.1 22.4,21.1 22.5,21.1C22.75,21.1 23,20.85 23,20.6V6C22.4,5.55 21.75,5.25 21,5M21,18.5C19.9,18.15 18.7,18 17.5,18C15.8,18 13.35,18.65 12,19.5V8C13.35,7.15 15.8,6.5 17.5,6.5C18.7,6.5 19.9,6.65 21,7V18.5Z" />
</svg>`;
    btn.innerHTML = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
</svg>`;
    btn.dataset.ident = i;
    edit.dataset.ident = i;
    btn.addEventListener("click", deletethis);
    edit.addEventListener(`click`, toggle);
    Actions.appendChild(btn);
    Actions.appendChild(edit);
    titlebook.textContent = myLibary[i].title;
    authorbook.textContent = myLibary[i].author;
    pagesbook.textContent = myLibary[i].pages;
    if (myLibary[i].read) {
      readbook.textContent = "Read";
    } else {
      readbook.textContent = "Not read yet";
    }
    // readbook.textContent = myLibary[i].read;
    tr.appendChild(titlebook);
    tr.appendChild(authorbook);
    tr.appendChild(pagesbook);
    tr.appendChild(readbook);
    tr.appendChild(Actions);
    table.appendChild(tr);
  }
};

// Remove every created dom element for redrawing after an update
const remove = function () {
  document.querySelectorAll(`.thebooks`).forEach((e) => e.remove());
};

// Delete button in Actions for a Single book
const deletethis = function () {
  myLibary.splice(this.dataset.ident, 1);
  remove();
  if (myLibary.length === 0) return;
  drawBooks(myLibary.length);
};

//  Toggle to Either Read or not read Yet
const toggle = function () {
  if (myLibary[this.dataset.ident].read) {
    myLibary[this.dataset.ident].read = false;
  } else {
    myLibary[this.dataset.ident].read = true;
  }
  remove();
  drawBooks(myLibary.length);
};

//  Opens the Add new Book form
const openForm = function () {
  form.classList.add("active");
  grayout.classList.add("active");
};

//  Closes the form Either by clicking outside of it or Close btn And Submit btn
const closeForm = function () {
  form.classList.remove("active");
  grayout.classList.remove("active");
  //   if (this.id === close) {
  //     resetForm();
  //   }
  if (this.id === undefined) return;
  resetForm();
};

addnewbookBtn.addEventListener(`click`, openForm);
closeBtn.addEventListener("click", closeForm);
grayout.addEventListener("click", closeForm);
drawBooks(myLibary.length);

// Gets Current Year for footer
const yeartxt = document.querySelector(`#year`);
const now = new Date();
const yearNow = now.getFullYear();

yeartxt.textContent = yearNow;
