import RouteBuilder from "../../../backend/common/route-builder"
import Client from "../../../backend/models/client-model"
import jwt from "jsonwebtoken"
import allowAdmin from "../../../backend/middlewares/allow-admin"
import mongooseConnect from "../../../backend/common/mongoose-connect"

const createClient = async (req, res) => {
  const { name, description, redirectUrl } = req.body

  await mongooseConnect()

  const client = new Client({
    name,
    description,
    redirectUrl
  })

  await client.save()

  res.send({
    clientId: client._id,
    clientSecret: jwt.sign({ sub: client._id, redirectUrl }, process.env.JWT_SIGNING_KEY),
    redirectUrl
  })
}

export default allowAdmin(
  new RouteBuilder()
    .post(createClient)
    .build()
)