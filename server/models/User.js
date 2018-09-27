const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

var userSchema = new Schema({
  name:  String,
  username: String,
  email:   String,
  password: String,
  status: [{ type: Schema.Types.ObjectId, ref: 'Status' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

userSchema.post('validate', doc => {
  let hash = bcrypt.hashSync(doc.password, Number(process.env.HASH_PASS))
  doc.password = hash
})

const User = mongoose.model('User', userSchema)

module.exports = User