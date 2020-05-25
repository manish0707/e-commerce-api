const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product'
  },
  name: String,
  count: Number,
  price: Number
})

const ProductCart = mongoose.model("ProductCart", ProductCartSchema)

const OrderSchema = new mongoose.Schema({
  products: [ProductCartSchema],
  transection_id : {},
  amount: Number,
  address : String,
  status: {
    type: String,
    default: "RECIEVED",
    enum: ["CANCELLED", "DELIVERED", "SHIPPED", "PROCESSING", "RECIEVED"]
  },
  updated: Date,
  user: {
    type: ObjectId,
    ref: "User"
  }
}, {timestamps: true})

const Order = mongoose.model("Order", OrderSchema)

module.exports = { Order, ProductCart }