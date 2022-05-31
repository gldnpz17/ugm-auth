import Client from "../../../backend/models/client-model"
import RouteBuilder from "../../../backend/common/route-builder"
import mongooseConnect from "../../../backend/common/mongoose-connect"

const readClientDetails = async (req, res) => {
  const { clientId } = req.query

  await mongooseConnect()

  const client = await Client.findById(clientId)

  res.send(client)
}

export default new RouteBuilder().get(readClientDetails).build()