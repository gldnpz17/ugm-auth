import RouteBuilder from "../../../backend/common/route-builder"
import jwt from "jsonwebtoken"

const getIdentity = (req, res) => {
  const { studentId } = req.query
  const rawAccessToken = req.headers['authorization'].split(' ')[1]

  const accessToken = jwt.verify(rawAccessToken, "super-secret-key")

  if (accessToken.data.studentId === studentId) {
    res.send({
      studentId,
      niu: "444051",
      attributes: [
        { name: "Nama lengkap", value: "Alice [REDACTED]" },
        { name: "Fakultas", value: "Teknik" },
        { name: "Departemen", value: "DTETI" },
        { name: "Jurusan", value: "Teknologi Informasi" },
        { name: "Angkatan", value: "2019" }
      ]
    })
  }
}

export default new RouteBuilder().get(getIdentity).build()