import { request } from "express"

// middlewares/auth.js
const authorization = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization !== "Bearer 1234") {
    res.status(401).json({ message: "Not authorized" })
    res.end()
    return
  }
  next()
}

export default authorization