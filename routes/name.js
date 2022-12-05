
const name = (app) => {
  app.get("/name", (req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.send(`<link rel="stylesheet" type="text/css" href="/style.css"/><h1>Hello ${req.params.name}</h1>`)
    res.end()
  })
}

export default name