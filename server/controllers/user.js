const db = require("../modules");
const { v4 } = require("uuid");

const Book = db.Book;

const addBook = async (req, res) => {
  const userId = req.user.id;
  // console.log(req.body, userId);
  if (userId) {
    let bookDetail = {
      bookName: req.body.book,
      publish: req.body.publishDate,
      price: req.body.price,
    };
    let authorDetail = {
      AuthorName: req.body.author,
      age: req.body.age,
      dob: req.body.dob,
    };

    Book.create({ id: v4(), userId, bookDetail, authorDetail })
      .then(() => {
        res.status(200).json({
          msg: "Book added",
          success: true,
        });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
};

const showBook = (req, res) => {
  // console.log(res.body);
  const userId = req.user.id;
  console.log(userId);
  if (userId) {
    Book.findAll({ where: { userId } })
      .then((data) => {
        if (data) {
          console.log("book found");
          return res.status(200).json({
            msg: "found.",
            data: data,
            success: true,
          });
        }
      })
      .catch((err) => {
        res.status(403).json({ err });
      });
  }
};

const deleteBook = (req, res) => {
  const userId = req.user.id;
  const id = req.body.id;
  if (userId && id) {
    Book.destroy({ where: { id } })
      .then((data) => {
        if (data) {
          console.log("book found");
          return res.status(200).json({
            msg: "Book Delete",
            success: true,
          });
        }
      })
      .catch((err) => {
        res.status(403).json({ err });
      });
  }
};

module.exports = { addBook, showBook, deleteBook };
