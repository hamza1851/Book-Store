import express from "express"
import { Book } from "../models/bookModel.js"

const router = express.Router()

//Uploading the books to Database
router.post("/", async (req, res) => {
  console.log("Received request:", req.body)
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: Title, Author, Publish Year",
      })
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: Number(req.body.publishYear), //Converting to number
    }
    console.log("Received book:", newBook)
    const book = await Book.create(newBook)

    return res.status(201).send(book)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Route for get all books from Database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({})
    return res.status(200).json({
      count: books.length,
      data: books,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Route for get books from Database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const book = await Book.findById(id)
    return res.status(200).json(book)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Route for updating book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        messaage: "Send all the required fields: Title, Author, Publish Year",
      })
    }

    const { id } = req.params

    const result = await Book.findByIdAndUpdate(id, req.body)

    if (!result) {
      return res.status(404).json({ messaage: "Book not found" })
    }

    return res.status(200).send({ messaage: "Book updated successfully" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Route for deleting the book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await Book.findByIdAndDelete(id)

    if (!result) {
      res.status(404).json({ message: "Book not found" })
    }

    return res.status(200).send({ messaage: "Book deleted successfully" })
  } catch (error) {
    console.log(error.messaage)
    res.status(500).send({ message: error.message })
  }
})

export default router
