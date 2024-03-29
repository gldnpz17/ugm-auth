import RouteBuilder from "../../../backend/common/route-builder"
import jwt from "jsonwebtoken"
import Client from "../../../backend/models/client-model"
import mongooseConnect from "../../../backend/common/mongoose-connect"

const getAccessToken = async (req, res) => {
  const { authToken: rawAuthToken, clientId, clientSecret: rawClientSecret } = req.body

  await mongooseConnect()

  const authToken = jwt.verify(rawAuthToken, process.env.JWT_SIGNING_KEY)
  const clientSecret = jwt.verify(rawClientSecret, process.env.JWT_SIGNING_KEY)

  const client = await Client.findById(authToken.sub)

  if (
    client && 
    authToken.type === "AuthToken" &&
    clientId === authToken.sub &&
    clientId === clientSecret.sub
  ) {
    res.send({
      accessToken: jwt.sign({ 
        sub: clientId, 
        type: "AccessToken",
        student: authToken.student
      }, process.env.JWT_SIGNING_KEY, { expiresIn: "30d" })
    })
  } else {
    res.status(401).send("Invalid client credentials.")
  }
}

export default new RouteBuilder().post(getAccessToken).build()