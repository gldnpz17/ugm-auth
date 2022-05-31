import axios from "axios"

const readClientDetails = async ({ clientId }) =>
  (await axios.get(`/api/clients/${clientId}`)).data
 
const createClient = async ({ name, description, redirectUrl }) => {
  return (await axios.post("/api/clients", { name, description, redirectUrl })).data
}

export {
  readClientDetails,
  createClient
}