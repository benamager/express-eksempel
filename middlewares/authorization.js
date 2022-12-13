import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

// middlewares/auth.js
const authorization = (req, res, next) => {
  // check auth headers exists
  if (!req.headers.authorization === null) {
    res.status(401).json({ message: "Not authorized" })
    res.end()
    return
  }
  // check if formatted correctly
  const [bearer, token] = req.headers.authorization.split(" ")
  if (!bearer && !token) {
    res.status(403).json({ message: "Wrong data of some kind." })
    res.end()
    return
  }
  // check if formatted correctly
  if (bearer.toLowerCase() !== "bearer") {
    res.status(403).json({ message: "Bad token formation." })
    res.end()
    return
  }
  // check if valid
  try {
    jwt.verify(token, process.env.TOKEN_SECRET)
    next()
  } catch (error) {
    res.status(401).json({ message: "Not authorized" })
    res.end()
    return
  }
}

export default authorization