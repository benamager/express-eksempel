import postHandler from "./postHandler.js"

const users = (app) => {
  app.route('/api/v1/users/:id?')
    .post(postHandler)
}

export default users
