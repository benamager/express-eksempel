import useDB from "../../functions/useDB.js"

const postHandler = async (req, res) => {
  const requiredKeys = ["title", "description", "price"]; // required keys for req.body

  const isArray = Array.isArray(req.body)
  const { collection: booksCollection, client } = await useDB("BooksExpress", "books") // connect to db

  const singleBook = [Object.assign({}, req.body)] // assign req.body to remove multipart form validation
  const data = isArray ? req.body : singleBook // set data to raw data or converted data in array format

  // check if all required keys are present
  const isValid = data.every((obj) => {
    const hasRequiredKeys = requiredKeys.every((key) => obj.hasOwnProperty(key));
    return hasRequiredKeys;
  });

  // send error if not valid
  if (isValid === false) {
    res.status(422).json({ message: "Title, description, price and image is required." }).end()
    return
  }

  try {
    // single book, insertOne
    if (isArray === false) {
      const result = await booksCollection.insertOne(data[0]);
      res.status(201).json({ message: "Succesfully created book", book: result }).end()
      return
    }
    // multiple books, insertMany
    const result = await booksCollection.insertMany(data);
    res.status(201).json({ message: "Succesfully created books", books: result }).end()
  } catch (error) {
    // send error if something went wrong
    res.status(500).json({ message: "Something went wrong.", error: error })
  }

  client.close()
}

export default postHandler;