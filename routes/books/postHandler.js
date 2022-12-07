const postHandler = (req, res) => {
  const { title, author } = req.body
  if (!title || !author) {
    res.status(422).json({ message: "Title and author is required." })
    res.end()
  }
  res.send(`Add book with title: ${title} and author: ${author}`).end()
}

export default postHandler;