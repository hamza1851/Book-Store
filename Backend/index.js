import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import { Book } from "./models/bookModel.js"
import booksRoute from "./routes/booksRoutes.js"
import cors from "cors"

const app = express()

//Adding Middleware for parsing request body
app.use(express.json())

//middleware for cors policy
// app.use(
//   cors({
//     origin: "http//localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Cotent-Type"],
//   })
// )

app.get("/", (req, res) => {
  console.log(req)
  return res.status(234).send("Welcome To Home Page")
})

app.use("/books", booksRoute)

mongoose.connect(mongoDBURL).then(() => {
  console.log(`App Connected to Database`)
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`)
  })
})
