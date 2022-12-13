import express from "express"
const PORT = process.env.PORT || 3000

import books from "./routes/books/index.js"
import users from "./routes/users/index.js"
import auth from "./routes/auth/index.js"

const app = express()
app.use(express.static("./public")) // makes the public folder accessible
app.use(express.json()) // parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })) // parses incoming requests with urlencoded payloads

// book route
books(app)

// auth route
users(app)

// auth route
auth(app)

// 404 route
app.get("*", (req, res) => {
  res.sendStatus(404)
  res.end()
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})