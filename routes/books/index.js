import authorization from "../../middlewares/authorization.js"
import getHandler from "./getHandler.js"
import postHandler from "./postHandler.js"
import putHandler from "./putHandler.js"
import deleteHandler from "./deleteHandler.js"

const books = (app) => {
  app.route('/books/:id?') // ? means optional parameter
    .get(getHandler)
    .post(authorization, postHandler)
    .put(authorization, putHandler)
    .delete(authorization, deleteHandler)
}

export default books