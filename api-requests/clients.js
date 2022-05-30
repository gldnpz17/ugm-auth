import axios from "axios"

const createClient = async ({ name, description, redirectUrl }) => {
  return (await axios.post("/api/clients", { name, description, redirectUrl })).data
}

export {
  createClient
}