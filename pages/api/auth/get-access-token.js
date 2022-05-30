import RouteBuilder from "../../../backend/common/route-builder"
import jwt from "jsonwebtoken"

const getAccessToken = (req, res) => {
  const { authToken: rawAuthToken, clientId, clientSecret } = req.body

  const authToken = jwt.verify(rawAuthToken, "super-secret-key")

  if (
    authToken.sub === "alice" && 
    clientId === authToken.clientId &&
    clientId === "demo-app-client-id" &&
    clientSecret === "demo-app-client-secret"
  ) {
    res.send({
      accessToken: jwt.sign({ 
        sub: "alice", 
        data: {
          studentId: "4l1c3Stud3ntId",
          niu: "444051"
        } 
      }, "super-secret-key", { expiresIn: 60 })
    })
  }
}

export default new RouteBuilder().post(getAccessToken).build()