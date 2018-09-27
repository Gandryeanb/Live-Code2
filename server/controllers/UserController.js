const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {

  static loginEmail (req, res) {

    User.find({ email: req.body.email})
      .then(data => {
        if (data.length === 1) {
          if (bcrypt.compareSync(req.body.password, data[0].password)) {
            let token = jwt.sign({
              id: data[0]._id
            }, process.env.JWT_HASH)
            res.status(200).json({
              token: token
            })          
          } else {
            res.status(403). json({
              msg: 'you need to login first'
            })    
          }
        } else {
          res.status(403). json({
            msg: 'you need to login first'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }

  static loginUsername (req, res) {
    User.find({ username: req.body.username})
      .then(data => {
        if (data.length === 1) {
          if (bcrypt.compareSync(req.body.password, data[0].password)) {
            let token = jwt.sign({
              id: data[0]._id
            }, process.env.JWT_HASH)
            res.status(200).json({
              token: token
            })          
          } else {
            res.status(403). json({
              msg: 'you need to login first'
            })    
          }
        } else {
          res.status(403). json({
            msg: 'you need to login first'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }

  static whoIsThis(req, res) {
    User.find({ _id: req.decoded.id })
      .then(data => {
        if (data.length == 1) {

          res.status(200).json({
            id: data[0]._id,
            name: data[0].name
          })
        } else {
          res.status(404).json({
            msg: 'user not found'
          })  
        }
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }

  static create(req, res) {
    let data = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }

    let user = new User(data)
    user.save()
      .then(data => {
        res.status(500).json({
          msg: 'success create'
        })
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }

}

module.exports = UserController