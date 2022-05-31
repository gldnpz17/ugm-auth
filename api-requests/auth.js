import axios from "axios"

const adminLogin = async ({ password }) => {
  await axios.post("/api/auth/admin-login", { password })
}

const introspectAuth = async () => {
  const { data } = await axios.get("/api/auth/introspect")
  return data
}

export {
  adminLogin,
  introspectAuth
}