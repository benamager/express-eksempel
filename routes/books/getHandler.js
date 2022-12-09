import { ObjectId } from "mongodb" // for working with id's
import useDB from '../../functions/useDB.js';
import dotenv from "dotenv"
dotenv.config()

const getHandler = async (req, res) => {
  const bookId = req.params.id || null
  const limit = parseInt(req.query.limit) || 20
  const skip = parseInt(req.query.skip) || 0
  const originalUrl = req.originalUrl

  // connect to db
  const { collection: booksCollection, client } = await useDB("BooksExpress", "books")

  // add the url to response object
  const addUrlToObject = (book) => {
    return { ...book, url: `${process.env.SITE_URL}/books/${book._id}` }
  }

  // find single book and return if found
  if (bookId !== null) {
    const bookById = await booksCollection.find({ _id: ObjectId(bookId) }).toArray();
    bookById.length > 0 ? res.send(addUrlToObject(bookById[0])).end() : res.sendStatus(404).end()
  }

  // all books with hypermedia controls
  if (bookId === null) {
    const allBooks = await booksCollection.find().limit(limit).skip(skip).toArray();
    const booksCount = await booksCollection.countDocuments()
    const resObject = {
      count: booksCount,
      next: skip + limit >= booksCount ? null : `${process.env.SITE_URL}/api/v1/cheeses?limit=${limit}&skip=${skip + limit}`,
      previous: skip === 0 ? null : `${process.env.SITE_URL}/api/v1/cheeses?limit=${limit}&skip=${skip - limit > 0 ? 0 : skip - limit}`,
      results: allBooks.map((book) => addUrlToObject(book))
    }
    res.send(resObject).end()
  }

  client.close()
}

export default getHandler;