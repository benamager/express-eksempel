import express from "express"
const PORT = process.env.PORT || 3000

import oste from "./routes/oste.js"
import authorization from "./middlewares/authorization.js"

const app = express()
app.use(express.static("./public")) // makes the public folder accessible

oste(app)


app.get("*", (req, res) => {
  res.setHeader("Content-Type", "text/html")
  res.send(`<h1>404</h1>`)
  res.end()
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})