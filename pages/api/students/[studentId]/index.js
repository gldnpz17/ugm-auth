import RouteBuilder from "../../../../backend/common/route-builder"
import Student from "../../../../backend/models/student-model"

const deleteStudent = async (req, res) => {
  const { studentId } = req.query

  const deletedStudent = await Student.findByIdAndDelete(studentId)

  res.send(deletedStudent)
}

export default new RouteBuilder()
  .delete(deleteStudent)
  .build()