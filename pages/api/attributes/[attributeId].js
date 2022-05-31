import RouteBuilder from "../../../backend/common/route-builder"
import allowAdmin from "../../../backend/middlewares/allow-admin"
import Attribute from "../../../backend/models/attribute-model"
import Student from "../../../backend/models/student-model"

const deleteAttribute = async (req, res) => {
  const { attributeId } = req.query

  const deletedAttribute = await Attribute.findByIdAndDelete(attributeId)

  const students = await Student.find({})

  await Promise.all(students.map(async student => {
    student.values = student.values.filter(value => !deletedAttribute._id.equals(value.attribute))
    await student.save()
  }))

  res.send(deletedAttribute)
}

export default allowAdmin(
  new RouteBuilder()
    .delete(deleteAttribute)
    .build()
)