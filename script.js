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

const test = new book("a", "b", "c", "d");

console.log(test.info());
