const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    default: ""
  }
})

const Attribute = mongoose.models.Attribute || mongoose.model("Attribute", schema)

export default Attribute