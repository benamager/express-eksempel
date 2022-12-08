import { ObjectId } from "mongodb" // for working with id's
import useDB from "../../functions/useDB.js"

const deleteHandler = async (req, res) => {
  const bookId = req.params.id || null
  if (!bookId) {
    res.status(422).json({ message: "Id is required" })
    res.end()
    return
  }

  // connect to db
  const { collection: booksCollection, client } = await useDB("BooksExpress", "books")

  try {
    // delete book by id and return successfull message or 404
    const result = await booksCollection.deleteOne({ _id: ObjectId(bookId) });
    const deletedCount = result.deletedCount
    if (deletedCount === 1) res.status(200).json({ message: `Book with id ${bookId} deleted successfully.` })
  } catch (error) {
    res.status(500).json({ message: `Book with id <${bookId}> isn't found..!` })
  }

  client.close()
}

export default deleteHandler;