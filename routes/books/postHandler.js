import sharp from "sharp"

const postHandler = async (req, res) => {
  const { title, author } = req.body || null
  const imgFile = req.file || null
  const imgPath = imgFile ? imgFile.path.replace("public/", "localhost:3000/") : null

  if (!title || !author || !imgFile) {
    res.status(422).json({ message: "Title, author and image is required." })
    res.end()
    return
  }

  res.status(200).json({ message: "Book succesfully created", object: { title, author, imgLocation: imgPath } })

  // const { title, author } = req.body
  // if (!title || !author) {
  //   res.status(422).json({ message: "Title and author is required." })
  //   res.end()
  // }
  // res.send(`Add book with title: ${title} and author: ${author}`).end()
}

export default postHandler;