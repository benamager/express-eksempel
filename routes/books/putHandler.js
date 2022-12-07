const putHandler = (req, res) => {
  const bookId = req.params.id || null
  if (!bookId) {
    res.status(422).json({ message: "Id is required" })
    res.end()
    return
  }
  res.send(`Update the book with id ${bookId}`)
}

export default putHandler;