import RouteBuilder from "../../../backend/common/route-builder"
import jwt from "jsonwebtoken"

const generateRandomId = (length) => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const adminLogin = (req, res) => {
  const { password } = req.body

  if (password === process.env.ADMIN_PASSWORD) {
    res.send({
      authToken: jwt.sign({
        sessionId: generateRandomId(16)
      }, process.env.JWT_SIGNING_KEY),
      redirectUrl: "http://localhost:3200/redirect-handler"
    })
  } else {
    res.status(401).send({
      error: "Invalid password"
    })
  }
}

export default new RouteBuilder().post(adminLogin).build()