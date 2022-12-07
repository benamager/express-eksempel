import multer from "multer"
import authorization from "../../middlewares/authorization.js"
import getHandler from "./getHandler.js"
import postHandler from "./postHandler.js"
import putHandler from "./putHandler.js"
import deleteHandler from "./deleteHandler.js"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
  },
})

const upload = multer({ storage: storage, limits: { fileSize: 10000 } })



const books = (app) => {
  app.route('/books/:id?') // ? means optional parameter
    //.all(authorization)
    .get(getHandler)
    .all(authorization)
    .post(upload.single('img'), postHandler)
    .put(putHandler)
    .delete(deleteHandler)
}

export default books
