const titleInput = document.querySelector(`#title`);
const authorInput = document.querySelector(`#author`);
const pagesInput = document.querySelector(`#pages`);
const read1 = document.querySelector(`#read1`);
const read2 = document.querySelector(`#read2`);
const submitBtn = document.querySelector(`#submit`);
const table = document.querySelector(`table`);

let myLibary = [];
function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title}, ${author}, ${pages}, ${read}`;
  };
}

const submit = function (e) {
  if (
    titleInput.value !== "" &&
    authorInput.value !== "" &&
    pagesInput.value !== ""
  ) {
    if (read1.checked === true || read2.checked === true) {
      let readStatus = "";
      if (read1.checked === true) readStatus = "Read";
      if (read2.checked === true) readStatus = "Not Read Yet";
      myLibary.push(
        new book(
          titleInput.value,
          authorInput.value,
          pagesInput.value,
          readStatus
        )
      );
      e.preventDefault();
      titleInput.value = "";
      authorInput.value = "";
      pagesInput.value = "";
      read1.checked = false;
      read2.checked = false;
      drawBooks(myLibary.length);
    }
  }
};

submitBtn.addEventListener(`click`, submit);

const drawBooks = function (e) {
  remove();
  for (let i = 0; i < e; i++) {
    const tr = document.createElement("tr");
    tr.className = "thebooks";
    const titlebook = document.createElement(`td`);
    const authorbook = document.createElement(`td`);
    const pagesbook = document.createElement(`td`);
    const readbook = document.createElement(`td`);
    titlebook.textContent = myLibary[i].title;
    authorbook.textContent = myLibary[i].author;
    pagesbook.textContent = myLibary[i].pages;
    readbook.textContent = myLibary[i].read;
    tr.appendChild(titlebook);
    tr.appendChild(authorbook);
    tr.appendChild(pagesbook);
    tr.appendChild(readbook);
    table.appendChild(tr);
    console.log(tr);
  }
};

const remove = function () {
  document.querySelectorAll(`.thebooks`).forEach((e) => e.remove());
};
