import RouteBuilder from "../../../backend/common/route-builder"
import jwt from "jsonwebtoken"

const generateAuthToken = (req, res) => {
  const { ugmId, password, clientId } = req.body

  if (clientId === "demo-app-client-id" && ugmId === "alice" && password === "alice-password") {
    res.send({
      authToken: jwt.sign({ sub: "alice", clientId }, "super-secret-key", { expiresIn: 60 }),
      redirectUrl: "http://localhost:3200/redirect-handler"
    })
  }
}

export default new RouteBuilder().post(generateAuthToken).build()