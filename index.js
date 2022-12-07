import express from "express"
const PORT = process.env.PORT || 3000

import oste from "./routes/oste.js"
import books from "./routes/books/index.js"
import authorization from "./middlewares/authorization.js"

const app = express()
app.use(express.static("./public")) // makes the public folder accessible
app.use(express.json()) // parses incoming requests with JSON payloads

// book route
books(app)

// 404 route
app.get("*", (req, res) => {
  res.sendStatus(404)
  res.end()
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})