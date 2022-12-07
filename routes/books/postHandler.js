const postHandler = async (req, res) => {
  const { title, author } = req.body || null
  const imgFile = req.file || null
  const imgPath = imgFile ? imgFile.path.replace("public/", "/") : null

  if (!title || !author || !imgFile) {
    res.status(422).json({ message: "Title, author and image is required." })
    res.end()
    return
  }

  res.status(200).json({ message: "Book succesfully created", object: { title, author, imgLocation: imgPath } })
}

export default postHandler;