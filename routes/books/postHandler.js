import useDB from "../../functions/useDB.js"

const postHandler = async (req, res) => {
  const { title, description, price } = req.body || null
  const imgFile = req.file || null
  const imgPath = imgFile ? imgFile.path.replace("public/", "/") : null

  if (!title || !description, !price || !imgFile) {
    res.status(422).json({ message: "Title, description, price and image is required." })
    res.end()
    return
  }

  // connect to db
  const { collection: booksCollection, client } = await useDB("BooksExpress", "books")

  try {
    // insert book
    const result = await booksCollection.insertOne({ title, description, price });
    // return 201 and book
    res.status(201).json({
      message: "Book created successfully.", book: {
        _id: result.insertedId,
        title,
        description,
        price,
      }
    })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error: error })
  }

  client.close()
}

export default postHandler;