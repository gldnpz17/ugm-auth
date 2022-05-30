import axios from "axios"

const adminLogin = async ({ password }) => {
  await axios.post("/api/auth/admin-login", { password })
}

export {
  adminLogin
}