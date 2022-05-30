const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  redirectUrl: { type: String, required: true }
})

const Client = mongoose.models.Client || mongoose.model("Client", schema)

export default Client