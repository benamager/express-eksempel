import authorization from "../../middlewares/authorization.js"
import getHandler from "./getHandler.js"
import postHandler from "./postHandler.js"
import patchHandler from "./patchHandler.js"
import deleteHandler from "./deleteHandler.js"
import upload from "../../middlewares/upload.js"

const books = (app) => {
  app.route('/api/v1/books/:id?') // ? means optional parameter
    //.all(authorization)
    .get(getHandler)
    .all(authorization)
    .post(upload.single('img'), postHandler)
    .patch(patchHandler)
    .delete(deleteHandler)
}

export default books
