const mongoose = require('mongoose')

const schema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  attribute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attribute',
    required: true
  },
  value: {
    type: String
  }
})

const StudentAttribute = mongoose.models.StudentAttribute || mongoose.model('StudentAttribute', schema)

export default StudentAttribute