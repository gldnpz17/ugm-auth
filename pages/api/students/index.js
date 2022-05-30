import mongooseConnect from "../../../backend/common/mongoose-connect"
import RouteBuilder from "../../../backend/common/route-builder"
import Student from "../../../backend/models/student-model"
import Attribute from "../../../backend/models/attribute-model"

const createStudent = async (req, res) => {
  await mongooseConnect()

  const { niu, name, values } = req.body

  const student = new Student({ niu, name, values })

  await student.save()

  res.send(student)
}

const readAllStudents = async (req, res) => {
  await mongooseConnect()

  const students = await Student
    .find({})
    .populate({
      path: 'values',
      populate: {
        path: 'attribute',
        model: 'Attribute'
      }
    })

  res.send(students)
}

export default new RouteBuilder()
  .post(createStudent)
  .get(readAllStudents)
  .build()