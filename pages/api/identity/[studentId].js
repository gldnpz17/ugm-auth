import RouteBuilder from "../../../backend/common/route-builder"
import jwt from "jsonwebtoken"
import Student from "../../../backend/models/student-model"
import Attribute from "../../../backend/models/attribute-model"

const getIdentity = async (req, res) => {
  const { studentId } = req.query
  const rawAccessToken = req.headers['authorization'].split(' ')[1]

  const accessToken = jwt.verify(rawAccessToken, process.env.JWT_SIGNING_KEY)

  if (accessToken.type === "AccessToken" && accessToken.student.id === studentId) {
    const student = await Student
      .findById(studentId)
      .populate({
        path: 'values',
        populate: {
          path: 'attribute',
          model: 'Attribute'
        }
      })

    res.send(student)
  } else {
    res.status(401).send("Invalid access token.")
  }
}

export default new RouteBuilder().get(getIdentity).build()