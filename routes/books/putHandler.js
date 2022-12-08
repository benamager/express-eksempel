import { ObjectId } from "mongodb"
import useDB from "../../functions/useDB.js"

const putHandler = async (req, res) => {
  const bookId = req.params.id || null
  if (!bookId) {
    res.status(422).json({ message: "Id is required" })
    res.end()
    return
  }

  // connect to db
  const { collection: booksCollection, client } = await useDB("BooksExpress", "books")

  try {
    // update book by id and return successfull message or 404
    const result = await booksCollection.updateOne({ _id: ObjectId(bookId) }, { $set: req.body });
    res.status(200).json({ message: `Book with id ${bookId} updated successfully.`, result: result })
  } catch (error) {
    res.status(404).json({ message: `Book with id <${bookId}> isn't found..!` })
  }

  client.close()
}

export default putHandler;