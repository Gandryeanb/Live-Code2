const Status = require('../models/Status')

class StatusController {
  
  static createStatus (req, res) {
    let data = {
      description: req.body.description,
      userId: req.decoded.id 
    }

    let status = new Status(data)

    status.save()
      .then(data => {
        res.status(201).json({
          msg: 'create status success'
        })
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }

  static findSearch (req, res) {
    Status.find({ description: { $regex: req.params.description, $options: 'i' }})
      .populate('userId', 'name')
      .then(data => {
        res.status(200).json({
          data: data
        })
      })
      .catch( err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }

  static getStatus (req, res) {
    Status.find()
      .populate('userId', 'name')
      .then(data => {
        res.status(200).json({
          data: data
        })
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }

}

module.exports = StatusController