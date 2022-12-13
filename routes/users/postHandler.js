import bcrypt from "bcrypt"
import useDB from "../../functions/useDB.js"

// create user
async function postHandler(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Username and password should be provided." }).end()
    return
  }

  const { collection, client } = await useDB("BooksExpress", "users")

  // check if user already exists
  const check = await collection.findOne({ username: req.body.username })
  if (check !== null) {
    res.status(403).json({ message: "User with that name already exists." }).end()
    return
  }

  // hash password
  const saltRounds = 10
  const hash = await bcrypt.hash(req.body.password, saltRounds)

  try {
    const result = await collection.findOneAndUpdate(
      { createdAt: Date.now() },
      {
        $set: {
          username: req.body.username,
          password: hash
        }
      },
      { upsert: true, returnDocument: "after" }
    )
    client.close()

    res.status(201).json(result.value).end()
    res.end()
  } catch (error) {
    console.log("create user error", error)
    res.status(500).end()
  }
}

export default postHandler