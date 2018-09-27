const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')

var statusSchema = new Schema({
  description:  String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

statusSchema.post('save', doc => {
  console.log('masuk hooks')
  console.log(doc)
  User.updateOne({_id: doc.userId}, { $push: { status: doc._id  } })
    .then(data => {
      console.log(data)
    })
})

const Status = mongoose.model('Status', statusSchema)

module.exports = Status






