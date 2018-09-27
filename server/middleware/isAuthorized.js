const User = require('../models/User')
const jwt = require('jsonwebtoken')

const isAuthorized = (req, res, next) => {
  let token = req.headers.token
  if (token) {
    let decoded = jwt.verify(token, process.env.JWT_HASH)
    User.find({ _id: decoded.id })
      .then(data => {
        if (data.length == 1) {
          req.decoded = decoded
          next()
        } else {
          res.status(403).json({
            message: 'you need to login first'
          })        
        }
      })
      .catch(data => {

      })
  } else {
    res.status(403).json({
      message: 'you need to login first no token'
    })
  }
}

module.exports = isAuthorized