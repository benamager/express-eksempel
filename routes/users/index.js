import postHandler from "./postHandler.js"

const users = (app) => {
  app.route('/api/v1/createUser')
    .post(postHandler)
}

export default users
