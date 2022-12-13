import token from "./token.js"

function auth(app) {
  app.route("/auth/token")
    .post(token)
}

export default auth;