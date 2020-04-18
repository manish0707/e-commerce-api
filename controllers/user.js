const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found!",
      });
    }
    req.profile = {
      id: user._id,
      firstname: user.name,
      lastname: user.lastname,
      email: user.email,
      purchases: user.purchases,
      role: user.role,
    };
    next();
  });
};

exports.getUser = (req, res) => {
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile.id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not udated!",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      return res.status(200).json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile.id })
    .populate("User", "_id name email")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found!",
        });
      }
      return res.status(200).json(order);
    });
};

exports.pushOrderInPurchaseArray = (req, res, next) => {
  const purchases = [];

  req.body.order.products.forEach((product) => {
    const { _id, name, description, category, quantity } = product;
    const { amount, transectionId } = req.body.order;
    purchases.push({
      _id,
      name,
      description,
      category,
      quantity,
      amount,
      transectionId,
    });
  });

  // Store this in DB
  User.findOneAndUpdate(
    { _id: req.profile.id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if(err) {
        return res.status(400).json({
          error: "Unable to save purchase!"
        })
      }
      next();
    }
  );
};
