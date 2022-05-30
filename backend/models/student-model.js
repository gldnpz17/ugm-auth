const mongoose = require('mongoose')

const schema = mongoose.Schema({
  niu: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  values: [{
    attribute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attribute',
      required: true
    },
    value: {
      type: String
    }
  }]
})

const Student = mongoose.models.Student || mongoose.model("Student", schema)

export default Student