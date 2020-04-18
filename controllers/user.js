const User = require('../models/user');


exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "No user was found!"
      })
    }
    req.profile = {
      id : user._id,
      firstname: user.name,
      lastname: user.lastname,
      email: user.email,
      purchases : user.purchases,
      role: user.role
    };
    next();
  });
}

exports.getUser = (req, res) => {
  return res.json(req.profile)
}

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile.id},
    {$set: req.body},
    {new: true, useFindAndModify: false} ,
    (err, user) => {
      if(err || !user) {
        return res.status(400).json({
          error : "User not udated!"
        })
      }
      user.salt = undefined;
      user.encry_password = undefined;
      return res.status(200).json(user);
    }
  )
}