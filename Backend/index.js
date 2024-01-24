import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import { Book } from "./models/bookModel.js"
import booksRoute from "./routes/booksRoutes.js"
import cors from "cors"

const app = express()

//Adding Middleware for parsing request body
app.use(express.json())

// middleware for cors policy
// this is specific for "http://localhost:5173"
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Cotent-Type"],
//   })
// )

// middleware for cors policy
// this allows acces from all urls
app.use(cors())

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
