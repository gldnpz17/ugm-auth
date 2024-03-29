import mongooseConnect from "../../../../backend/common/mongoose-connect"
import RouteBuilder from "../../../../backend/common/route-builder"
import allowAdmin from "../../../../backend/middlewares/allow-admin"
import Student from "../../../../backend/models/student-model"

const deleteStudent = async (req, res) => {
  const { studentId } = req.query

  await mongooseConnect()

  const deletedStudent = await Student.findByIdAndDelete(studentId)

  res.send(deletedStudent)
}

export default allowAdmin(
  new RouteBuilder()
    .delete(deleteStudent)
    .build()
)