import RouteBuilder from "../../../backend/common/route-builder"
import jwt from "jsonwebtoken"
import { serialize } from 'cookie'

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

    const token = jwt.sign({
      sessionId: generateRandomId(16)
    }, process.env.JWT_SIGNING_KEY, { expiresIn: "7d" })

    res
      .setHeader('Set-Cookie', serialize('authorization', `Bearer ${token}`, { path: '/' }))
      .send("Logged in") 
  } else {
    res.status(401).send({
      error: "Invalid password"
    })
  }
}

export default new RouteBuilder().post(adminLogin).build()