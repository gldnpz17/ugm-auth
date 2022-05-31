import mongooseConnect from "../../../backend/common/mongoose-connect"
import RouteBuilder from "../../../backend/common/route-builder"
import allowAdmin from "../../../backend/middlewares/allow-admin"
import Attribute from "../../../backend/models/attribute-model"

const createAttribute = async (req, res) => {
  await mongooseConnect()

  const { name, description } = req.body

  const attribute = new Attribute({ name, description })

  await attribute.save()

  res.send(attribute)
}

const readAllAttributes = async (req, res) => {
  await mongooseConnect()

  const attributes = await Attribute.find({})

  res.send(attributes)
}

export default allowAdmin(
  new RouteBuilder()
    .get(readAllAttributes)
    .post(createAttribute)
    .build()
)