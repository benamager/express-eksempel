import authorization from "../../middlewares/authorization.js"
import getHandler from "./getHandler.js"
import postHandler from "./postHandler.js"
import putHandler from "./putHandler.js"
import deleteHandler from "./deleteHandler.js"
import upload from "../../middlewares/upload.js"

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
