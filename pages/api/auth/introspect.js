import RouteBuilder from "../../../backend/common/route-builder"
import allowAdmin from "../../../backend/middlewares/allow-admin"
import { parse } from "cookie"
import jwt from "jsonwebtoken"

const introspect = async (req, res) => {
  let token = null
  try {
    const rawToken = parse(req.headers["cookie"])["authorization"].split(" ")[1]
    token = jwt.verify(rawToken, process.env.JWT_SIGNING_KEY)
  } catch (err) {
    token = null
  }

  res.send({ token })
}

export default new RouteBuilder().get(introspect).build()