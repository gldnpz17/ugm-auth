const mongoose = require('mongoose')

const schema = mongoose.Schema({
  niu: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
})

const Student = mongoose.models.Schema = mongoose.model("Student", schema)

export default Student