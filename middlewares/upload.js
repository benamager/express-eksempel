import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = file.mimetype.split("/").pop()
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`)
  },
})

const upload = multer({ storage: storage, limits: { fileSize: 10000 } })

export default upload;