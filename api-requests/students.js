import axios from "axios"

const readAllStudents = async () => {
  return (await (axios.get("/api/students"))).data
}

const createStudent = async ({ niu }) => {
  await axios.post("/api/students", { niu })
}

const upsertStudentAttribute = async ({ studentId, attributeId, value }) => {
  await axios.put(`/api/students/${studentId}/attributes/${attributeId}`, { value })
}

const deleteStudent = async ({ studentId }) => {
  await axios.delete(`/api/students/${studentId}`)
}

export {
  readAllStudents,
  createStudent,
  upsertStudentAttribute,
  deleteStudent
}