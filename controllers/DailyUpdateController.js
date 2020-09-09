const Daily = require('../models/DailyUpdate');

exports.create = (req, res) => {
  let user = req.user;
  let admin = 'admin@gmail.com';
  let [cases, deaths, recoveries] = [req.body.cases, req.body.deaths, req.body.recoveries];
  if (user.email == admin) {
    if (cases !== null && cases !== undefined) {
      if (deaths !== null && deaths !== undefined) {
        if (recoveries !== null && recoveries !== undefined) {
          const daily = new Daily({
            cases: cases,
            deaths: deaths,
            recoveries: recoveries
          }).save().then(docs => {
            return res.json(docs);
          }).catch(err => {
            return res.status(400).json(err);
          })
        } else return res.status(400).json({
          message: 'recoveries must haven to create'
        });
      } else return res.status(400).json({
        message: 'deaths must haven to create'
      });
    } else return res.status(400).json({
      message: 'cases must haven to create'
    });
  } else return res.status(400).json({
    message: 'You are Not an admin'
  });
}

exports.update = (req, res) => {
  let user = req.user;
  let admin = 'admin@gmail.com';
  let id = req.body.dailyId
  if (user.email == admin) {
    Daily.updateOne({
      _id: id
    }, {
      $set: req.body
    }).then(docs => {
      if (docs) {
        Daily.findById(id).then(docs => {
          return res.json({
            message: 'update successfully!',
            DailyUpdate: docs
          });
        }).catch(err => {
          return res.status(400).json(err);
        })
      }
    }).catch(err => {
      return res.status(400).json(err);
    })
  } else return res.status(400).json({
    message: 'You are Not An Admin'
  });
}

exports.getOne = (req, res) => {
  let user = req.user;
  if (user) {
    Daily.find({}).then(docs => {
      return res.json(docs);
    }).catch(err => {
      return res.status(400).json(err);
    })
  } else {
    return res.status(400).json({
      message: 'Please Login'
    });
  }
}
