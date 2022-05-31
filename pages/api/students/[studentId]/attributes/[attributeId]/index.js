import RouteBuilder from "../../../../../../backend/common/route-builder"
import Student from "../../../../../../backend/models/student-model"
import mongoose from "mongoose"
import allowAdmin from "../../../../../../backend/middlewares/allow-admin"

const upsertAttributeValue = async (req, res) => {
  const { studentId, attributeId } = req.query
  const { value } = req.body

  const student = await Student.findById(studentId)

  const attribute = mongoose.Types.ObjectId(attributeId)

  const existingValue = student.values.find(value => attribute.equals(value.attribute))

  if (existingValue) {
    existingValue.value = value
  } else {
    student.values.push({ attribute, value })
  }

  await student.save()

  res.send(student)
}

export default allowAdmin(
  new RouteBuilder()
    .put(upsertAttributeValue)
    .build()
)