const Product = require("../models/product")
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.getProductById = (req, res, next, id) => {
  Product.findById(id, (err, product) => {
    if(err) {
      return res.status(400).json({
        error : "Product not found!"
      })
    }

    req.product = product;
    next();
  })
}

exports.createProduct = (req, res) => {
  const form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if(err) {
      return res.status(400).json({
        error : "problem with image"
      })
    }

    const { name, price, description, category, stock } = fields;

    if(
      !name ||
      !price ||
      !description ||
      !category ||
      !stock
    ) {
      return res.status(400).json({
        error : "Please include all fields"
      })
    }
    
    const product = new Product(fields);

    // Hanldle file here
    if(file.photo) {
      if(file.photo.size > 3000000) {
        return res.status(400).json({
          error : "File size too big!"
        })
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to the  DB
    product.save((err, product) => {
      if(err) {
        return res.state(400).json({
          error : "Saving field"
        })
      }
      return res.json(product);
    })

  })
}

exports.getProduct = (req, res) => {
  return res.json(req.product)
}

// delte product
exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, deletedProduct) => {
    if(err) {
      return res.state(400).json({
        error: "Failed to delte product!"
      })
    }

    res.json({
      message: "Deleted sucessfully!",
      deletedProduct
    })
  })
}

// update product
exports.updateProduct = (req, res) => {
  const form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if(err) {
      return res.status(400).json({
        error : "problem with image"
      })
    }
    
    const product = req.product;

    product = {...product, fields}

    // Hanldle file here
    if(file.photo) {
      if(file.photo.size > 3000000) {
        return res.status(400).json({
          error : "File size too big!"
        })
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to the  DB
    product.save((err, product) => {
      if(err) {
        return res.state(400).json({
          error : "updation field!"
        })
      }
      return res.json(product);
    })

  })
}

// listing products
exports.getAllProducts = (req, res) => {
  const limit = parseInt(req.query.limit) || 8;
  const sortBy = req.query.sortBy || "_id";

  Product.find()
  .select('-photo')
  .populate("category")
  .limit(limit)
  .sort([[sortBy, "asc"]])
  .exec((err, products) => {
    if(err) {
      return res.status(400).json({
        message: "No product found!"
      })
    }
    res.json(products);
  })
}

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if(err) {
      return res.status(400).json({
        error: "No categories found!"
      })
    }

    res.json(categories);
  })
}

exports.updateStock = (req, req, next) => {
  const myOperations = req.body.order.products.map(product => {
    return {
      updateOne: {
        filter: {_id: product._id},
        update: {$inc: {stock: -product.count, sold: +product.count}}
      }
    }
  })

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if(err) {
      return res.status(400).json({
        error: "Operation failed!"
      })
    }
    next();
  })
}