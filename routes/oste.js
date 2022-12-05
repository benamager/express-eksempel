import authorization from "../middlewares/authorization.js"

const oste = (app) => {
  app.get("/oste", authorization, (req, res) => {
    res.json([{ id: "1", name: "Feta" }, { id: "2", name: "Gauda" }])
    res.end()
  })
}

export default oste