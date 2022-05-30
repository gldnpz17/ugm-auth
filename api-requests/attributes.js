import axios from "axios"

const readAllAttributes = async () => {
  return (await axios.get("/api/attributes")).data
}

const createAttribute = async ({ name, description }) => {
  await axios.post("/api/attributes", { name, description })
}

const deleteAttribute = async ({ id }) => {
  await axios.delete(`/api/attributes/${id}`)
}

export {
  readAllAttributes,
  createAttribute,
  deleteAttribute
}