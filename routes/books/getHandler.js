import { ObjectId } from "mongodb" // for working with id's
import useDB from '../../functions/useDB.js';

const getHandler = async (req, res) => {
  const bookId = req.params.id || null
  // connect to db
  const { collection: booksCollection, client } = await useDB("BooksExpress", "books")

  if (bookId !== null) {
    // find book by id, return it or 404
    const bookById = await booksCollection.find({ _id: ObjectId(bookId) }).toArray();
    bookById.length > 0 ? res.send(bookById).end() : res.sendStatus(404).end()
  }
  if (bookId === null) {
    // return all books
    const allBooks = await booksCollection.find().toArray();
    res.send(allBooks).end()
  }
  client.close()
}

export default getHandler;