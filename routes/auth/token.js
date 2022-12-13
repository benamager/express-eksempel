
import useDB from "../../functions/useDB.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export default async function token(req, res) {
  console.log("new token request for the user", req.body.username)
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Username and password must exist in body." }).end()
    return
  }

  const { collection: usersCollection, client } = await useDB("BooksExpress", "users")

  try {
    // find the user in the database
    const user = await usersCollection.findOne({ username: req.body.username })
    client.close() // close db
    // if the user doesn't exist
    if (user === null) {
      res.status(403).json({ message: "User doesn't exist." }).end()
      return
    }

    // if the password is wrong
    if (!await bcrypt.compare(req.body.password, user.password)) {
      res.status(403).json({ message: "Wrong username or password." }).end()
      return
    }

    const newToken = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET, { expiresIn: "1m" })

    res.status(201).json({ token: newToken }).end()
  } catch (error) {
    console.log("authentication token error", error)
    res.status(500)
    res.end()
  }
}