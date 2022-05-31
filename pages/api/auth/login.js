import RouteBuilder from "../../../backend/common/route-builder"
import jwt from "jsonwebtoken"
import Client from "../../../backend/models/client-model"
import Student from "../../../backend/models/student-model"
import axios from "axios"

const CHARSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const generateRandomId = () => {
  let id = ""
  for (let i = 0; i < 16; i++) {
    id += CHARSET[Math.floor(Math.random() * CHARSET.length)]
  }
  return id
}

const login = async (username, password) => {
  const body = new URLSearchParams()
  body.append('username', username)
  body.append('password', password)
  body.append('aId', generateRandomId())

  const response = await axios.post('https://simaster.ugm.ac.id/services/simaster/service_login', body)

  if (response.status === 200) {
    const { namaLengkap, userTipeNomor } = response.data

    return {
      fullName: namaLengkap,
      niu: userTipeNomor
    }
  } else {
    return null
  }
}

const generateAuthToken = async (req, res) => {
  const { ugmId, password, clientId } = req.body

  const client = await Client.findById(clientId)

  const response = await login(ugmId, password)

  if (client && response) {
    const student = await Student.findOne({ niu: response.niu })

    if (!student) {
      res.status(404).send('Student not in the database.')
      return
    }

    if (!student.name) {
      student.name = response.fullName
      await student.save()
    }
 
    res.send({
      authToken: jwt.sign({
        sub: clientId,
        type: "AuthToken",
        student: {
          id: student._id,
          niu: response.niu,
        }
      }, process.env.JWT_SIGNING_KEY, { expiresIn: 60 }),
      redirectUrl: client.redirectUrl
    })
  } else {
    res.status(401).send("Invalid credentials.")
  }
}

export default new RouteBuilder().post(generateAuthToken).build()