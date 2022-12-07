const getHandler = (req, res) => {
  const bookId = req.params.id || null
  if (bookId) {
    res.send(`Get book with id ${bookId}`).end()
  }
  res.send('Get all books').end()
}

export default getHandler;