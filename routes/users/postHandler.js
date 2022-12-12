import crypto from "crypto"
import bcrypt from "bcrypt"
import useDB from "../../functions/useDB.js"


const postHandler = async (req, res) => {
  const { username, password } = req.body;

  // basic err handling
  if (!username || !password) {
    res.status(400).json({ message: "Username and password is required." }).end()
    return
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds)

  const { collection: usersCollection, client } = await useDB("BooksExpress", "users") // connect to db


  // check if user already exists
  const user = await usersCollection.findOne({ username: username });
  if (user) {
    res.status(403).json({ message: "User already exists." }).end()
    return
  }

  // hash password
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');


  try {
    const createdAt = { createdAt: Date.now() }
    const newUser = {
      $set: {
        username: username,
        password: passwordHash,
      }
    }
    const result = await usersCollection.findOneAndUpdate(createdAt, newUser, { upsert: true, returnDocument: "after" })
    res.status(201).json(result.value).end()


  } catch (error) {
    // send error if something went wrong
    res.status(500).json({ message: "Something went wrong.", error: error })
  }
}

export default postHandler;